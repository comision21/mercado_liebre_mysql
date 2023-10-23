const { check, body } = require("express-validator");
const db = require('../database/models')

module.exports = [
  check("name").notEmpty().withMessage("El nombre es obligatorio"),
  check("surname").notEmpty().withMessage("El apellido es obligatorio"),
  body("email")
    .notEmpty().withMessage("El email es obligatorio").bail()
    .isEmail().withMessage("El email tiene un forma incorrecto").bail()
    .custom((value,{req}) => {
        return db.User.findOne({
            where : {
                email : value
            }
        }).then(user => {
            if(user){
                return Promise.reject()
            }
        }).catch(error => {
            console.log(error)
            return Promise.reject('El email ya se encuentra registrado')
        })
    }),
  check("password")
    .notEmpty().withMessage("El password es obligatorio").bail()
    .isLength({
        min: 6,
        max: 12
    }).withMessage('El password debe tener entre 6 y 12 caracteres'),
  body("password2")
    .notEmpty().withMessage("Debe confirmar la contraseña").bail()
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    })
];

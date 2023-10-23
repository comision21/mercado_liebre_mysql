const { validationResult } = require('express-validator');
const db = require('../database/models');
const { hashSync } = require('bcryptjs');
const toThousand = require('../helpers/toThousand')

module.exports = {
    register : (req,res) => {
        return res.render('userRegister')
    },
    processRegister : (req,res) => {

        const errors = validationResult(req)

        if(errors.isEmpty()){
            const {name,surname,email,password} = req.body
        
            db.User.create({
                name,
                surname,
                email,
                password : hashSync(password,10)
            })
                .then(user => {
                    console.log(user);
                    return res.redirect('/users/login')
                })
                .catch(error => console.log(error))
    
        }else {
            return res.render('userRegister',{
                errors : errors.mapped(),
                old : req.body
            })
        }
     

    },
    login : (req,res) => {
        return res.render('userLogin')
    },
    processLogin : (req,res) => {

        const errors = validationResult(req)

        if(errors.isEmpty()){

            db.User.findOne({
                where : {
                    email : req.body.email
                },
                include : ['favorites']
            }).then(user => {

                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.rolId,
                    favorites : user.favorites
                }

                return res.redirect('/')

            }).catch(error => console.log(error))
            
        }else{
            console.log(errors.mapped())
            return res.render('userLogin',{
                errors : errors.mapped()
            })
        }

    },
    profile : (req,res) => {

        db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                return res.render('userProfile',{
                    user
                })
            }).catch(error => console.log(error))
    },
    update : (req,res) => {

    },
    logout : (req,res) => {
        req.session.destroy()
        //todo MATAR LAS COOKIES

        return res.redirect('/')
    },
    favorites : (req,res) => {

        return res.render('favorites',{
            favorites : req.session.userLogin.favorites,
            toThousand
        })
    }
}
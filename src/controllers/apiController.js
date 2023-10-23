const db = require('../database/models');
const createError = require('http-errors');

const toggleFavorite = async (req,res) => {

    try {

        const productId = req.query.productId;
        const userId = req.query.userId;

        if(!productId) {
            throw createError(400, 'Se precisa el id del producto')
        }

        if(!userId){
             throw createError(401, 'El usuario no está logueado')
        }

        const favorite = await db.Favorite.findOne({
            where : {
                productId,
                userId
            }
        });

        if(favorite){
            await favorite.destroy()
        }else{
            await db.Favorite.create({
                productId,
                userId
            })
        }

        const favorites = await db.Favorite.findAll({
            where : {
                userId
            }

        })

        return res.status(200).json({
            ok : true,
            data : favorites
        })

        
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'upss, hubo un error'
        })
    }
}


module.exports = {
    toggleFavorite
}
const { list, show, create, update, destroy } = require('../controllers/adminController');
const { toggleFavorite } = require('../controllers/apiController');
const { getCart, addItemToCart, removeItemToCart, deleteItemToCart, clearCart } = require('../controllers/cartApiController');

const router = require('express').Router();

/* /apis */
router
    .get('/products', list)
    .get('/products:id',show)
    .post('/products',create)
    .put('/products:id',update)
    .delete('/products:id',destroy)

    .get('/toggle-favorite',toggleFavorite)

    .get('/cart', getCart)
    .post('/cart', addItemToCart)
    .delete('/cart',removeItemToCart)
    .delete('/cart/item', deleteItemToCart)
    .delete('/cart/all',clearCart)


module.exports = router;

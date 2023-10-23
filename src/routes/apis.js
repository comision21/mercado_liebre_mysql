const { list, show, create, update, destroy } = require('../controllers/adminController');
const { toggleFavorite } = require('../controllers/apiController');

const router = require('express').Router();

/* /apis */
router
    .get('/products', list)
    .get('/products:id',show)
    .post('/products',create)
    .put('/products:id',update)
    .delete('/products:id',destroy)

    .get('/toggle-favorite',toggleFavorite)

module.exports = router;

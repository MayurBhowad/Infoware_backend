const { addProduct, getAllProduct } = require('../services/product.service');

const router = require('express').Router();

router.get('/', async (req, res) => {
    let products = await getAllProduct();
    res.send(products)
})

router.post('/', async (req, res) => {
    let productId = await addProduct(req.body)
    res.json(productId)
})

module.exports = router;
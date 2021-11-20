const { addProduct, getAllProduct } = require('../services/product.service');
const auth = require('../middleware/auth.middleware');

const router = require('express').Router();

//@desc     get All products
//@route    GET /api/product
//access    public
router.get('/', async (req, res) => {
    let products = await getAllProduct();
    res.send({ success: true, products: products })
})

//@desc     Add new product
//@route    POST /api/product
//access    private
router.post('/', auth, (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ success: false, message: 'Access denied!' })
    }
    addProduct(req.body).then(productId => {
        let ress = {
            success: true,
            productId: productId,
            message: 'product added'
        }
        res.json(ress)
    }).catch(err => res.status(500).json(err))
})

module.exports = router;
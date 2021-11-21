const { newOrder } = require('../services/order.service');
const auth = require('../middleware/auth.middleware');

const router = require('express').Router();

//@desc     test route
//@route    GET /api/order
//access    public
router.get('/', (req, res) => {
    res.send({ msg: 'order router pass' })
})

//@desc     new Order
//@route    POST /api/order
//access    private
router.post('/', auth, (req, res) => {
    /**
     * data=[
     *  {productid: 10001, quantity: 3},
     *  {productid: 10002, quantity: 1},
     * ]
     */

    newOrder(req.body.products, req.user.userid).then(response => {
        return res.json({ success: true, data: response.record })
    }).catch(err => {
        res.status(500).json({ success: false, message: 'server error' })
    });
})

module.exports = router;
const { newOrder } = require('../services/order.service');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.send({ msg: 'order router pass' })
})

router.post('/', (req, res) => {
    /**
     * data=[
     *  {productid: 10001, quantity: 3},
     *  {productid: 10002, quantity: 1},
     * ]
     */

    newOrder(req.body.products).then(response => {
        return res.json({ success: true, data: response.record })
    }).catch(err => {
        res.status(500).json({ success: false, message: 'server error' })
    });
})

module.exports = router;
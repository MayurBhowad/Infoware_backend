const { newOrder, getAllOrderForUser, getAllOrderForAdmin } = require('../services/order.service');
const auth = require('../middleware/auth.middleware');

const router = require('express').Router();

//@desc     test route
//@route    GET /api/order
//access    private
router.get('/', auth, (req, res) => {
    if (req.user.isAdmin) {
        getAllOrderForAdmin().then(response => {
            return res.send({ success: true, orders: response })
        }).catch(err => {
            return res.status(500).json({ success: false, message: 'Server Error' })
        })
    } else {
        getAllOrderForUser(req.user.userid).then(result => {
            return res.send({ success: true, orders: result })
        }).catch(err => {
            return res.status(500).json({ success: false, message: 'Server Error' })
        })
    }
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

    newOrder(req.body, req.user.userid).then(response => {
        return res.json({ success: true, data: response.record })
    }).catch(err => {
        res.status(500).json({ success: false, message: 'server error' })
    });
})

module.exports = router;
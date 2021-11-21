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
/**
 * @swagger
 * /api/order:
 *      post:
 *          summary: New order
 *          tags: [Order]
 *          security:
 *              - token: ''
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: [
 *                                      {
 *                                        productid: 1001,
 *                                        quantity: 2
 *                                       },
 *                                      {
 *                                        productid: 1002,
 *                                        quantity: 2
 *                                       }
 *                                  ]
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: true 
 *                                  data: {
 *                                           id: 1msdnn3j23sdf23,
 *                                           userid: 1,
 *                                           products: [
 *                                                        {
 *                                                          productid: 1001,
 *                                                          quantity: 2
 *                                                        },
 *                                                        {
 *                                                          productid: 1002,
 *                                                          quantity: 2
 *                                                        }
 *                                                      ]
 *                                        }
 *              403:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: false 
 *                                  message: "A token is required for authentication"
 *              500:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: false 
 *                                  message: "something went erong"
 */
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
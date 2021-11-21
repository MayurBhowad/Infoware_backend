const { newOrder, getAllOrderForUser, getAllOrderForAdmin } = require('../services/order.service');
const auth = require('../middleware/auth.middleware');

const router = require('express').Router();

//@desc     test route
//@route    GET /api/order
//access    private
/**
 * @swagger
 * /api/order:
 *      get:
 *          summary: return list of orders (if Admin -> return all orders).
 *          tags: [Order]
 *          security:
 *              - token: ''
 *          
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: true 
 *                                  orders: {
 *                                           asd56as66a676a7a7: [
 *                                              {
 *                                                  orderid: eqwe7as7d686ds6s78a,
 *                                                  userid: 2,
 *                                                  productid: 1004,
 *                                                  quantity: 2,
 *                                              },
 *                                              {
 *                                                  orderid: qwe9812hy82ye8uudeh8,
 *                                                  userid: 2,
 *                                                  productid: 1003,
 *                                                  quantity: 2,
 *                                              }
 *                                           ]
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
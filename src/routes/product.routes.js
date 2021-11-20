const { addProduct, getAllProduct } = require('../services/product.service');
const auth = require('../middleware/auth.middleware');

const router = require('express').Router();


/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  - productTitle
 *                  - productPrice 
 *                  - productDetails
 *              properties:
 *                  productid:
 *                      type: string
 *                      description: Auto generated id of the product
 *                  productTitle:
 *                      type: string
 *                      description: Title of product
 *                  productPrice:
 *                      type: int
 *                      description: Price of product
 *                  productDetails:
 *                      type: string
 *                      description: description of product
 *              example:
 *                  id: 1
 *                  productTitle: productOne
 *                  productPrice: 30
 *                  productDetails: this is description of product one
 *          AddProduct:
 *              type: object
 *              required:
 *                  - productTitle
 *                  - productPrice 
 *                  - productDetails
 *              properties:
 *                  productTitle:
 *                      type: string
 *                      description: Title of product
 *                  productPrice:
 *                      type: int
 *                      description: Price of product
 *                  productDetails:
 *                      type: string
 *                      description: description of product
 *              example:
 *                  productTitle: productOne
 *                  productPrice: 30
 *                  productDetails: this is description of product one
 *          
 *          ProdAddSuccResponse:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                      description: is operation passed or faild
 *                  productId:
 *                      type: int
 *                      description: email of user
 *                  messge:
 *                      type: string
 *                      description: product added
 *              example:
 *                  success: true
 *                  productId: 1
 *                  message: product addded
 *      responses:
 *          404NotFound:       # Can be referenced as '#/components/responses/404NotFound'
 *              description: The specified resource was not found.
 */


//@desc     get All products
//@route    GET /api/product
//access    public
/**
 * @swagger
 * /api/product:
 *      get:
 *          summary: return the list of All products.
 *          tags: [Product]
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: true
 *                                  products: [
 *                                              {"productid": 1, "productTitle": "product one", "productPrice": 20, "productDetails": "this is description of product one"},
 *                                              {"productid": 2, "productTitle": "product two", "productPrice": 30, "productDetails": "this is description of product two"}
 *                                            ]
 *              404:
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: object
 *                                  example:
 *                                      success: false
 *                                      message: product not found
 *                              
 */
router.get('/', async (req, res) => {
    let products = await getAllProduct();
    res.send({ success: true, products: products })
})

//@desc     Add new product
//@route    POST /api/product
//access    private
/**
 * @swagger
 * /api/product:
 *      post:
 *          summary: Add new Product
 *          tags: [Product]
 *          security:
 *              - token: ''
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddProduct'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: true
 *                                  productId: 1
 *                                  message: product added
 *              403:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: false
 *                                  message: Access denied!
 */
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

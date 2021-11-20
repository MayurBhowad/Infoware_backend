const { addUser } = require('../services/user.service');
const auth = require('../middleware/auth.middleware')

const router = require('express').Router();

/**
 * @swagger
 * components:
 *      securitySchemes:
 *          token:
 *              type: http
 *              scheme: bearer
 *              in: header  
 *              bearerFormat: JWT
 *      schemas:
 *          Admin:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName 
 *                  - email
 *                  - password
 *                  - isAdmin
 *              properties:
 *                  id:
 *                      type: string
 *                      description: Auto generated id of the user
 *                  firstName:
 *                      type: string
 *                      description: First name of user
 *                  lastName:
 *                      type: string
 *                      description: Last name of user
 *                  email:
 *                      type: string
 *                      description: Email of user
 *                  password:
 *                      type: string
 *                      description: password for account
 *                  isAdmin:
 *                      type: boolean
 *                      descrription: define user is admin or not
 *              example:
 *                  id: 1
 *                  firstName: John
 *                  lastName: Doe
 *                  email: john@gmail.com
 *                  password: "123"
 *                  isAdmin: false
 *          InputAdmin:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName 
 *                  - email
 *                  - password
 *                  - isAdmin
 *              properties:
 *                  firstName:
 *                      type: string
 *                      description: First name of user
 *                  lastName:
 *                      type: string
 *                      description: Last name of user
 *                  email:
 *                      type: string
 *                      description: Email of user
 *                  password:
 *                      type: string
 *                      description: password for account
 *                  isAdmin:
 *                      type: boolean
 *                      descrription: define user is admin or not
 *              example:
 *                  firstName: John
 *                  lastName: Doe
 *                  email: john@gmail.com
 *                  password: "123"
 *                  isAdmin: false
 *      responses:
 *          404NotFound:       # Can be referenced as '#/components/responses/404NotFound'
 *              description: The specified resource was not found.
 */

router.get('/', (req, res) => {
    res.send({ msg: 'admin routes passed!' })
})

//@desc     add user
//@route    POST /api/admin
//access    public
/**
 * @swagger
 * /api/admin:
 *      post:
 *          summary: Add new user
 *          tags: [Admin]
 *          security:
 *              - token: ''
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/InputAdmin'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: true 
 *                                  insertId: 1
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
    if (!req.user.isAdmin) {
        return res.status(403).json({ success: false, message: 'Access denied!' })
    }
    addUser(req.body).then(userid => {
        res.send({ success: true, insertId: userid })
    }).catch(err => {
        console.log(err);
        res.status(500).send({ success: false, error: err });
    })
})

module.exports = router;
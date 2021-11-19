const { addUser } = require('../services/user.service');

const router = require('express').Router();

/**
 * @swagger
 * components:
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
 *                  password: 123
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
 *                  password: 123
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
 *          summary: Register new user
 *          tags: [Admin]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/InputAdmin'
 *          responses:
 *              200:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Admin'
 *              404:
 *                  description: The user not found  
 */
router.post('/', (req, res) => {
    addUser(req.body).then(ress => {
        res.send('user added')
    }).catch(err => {
        res.status(500).send(err);
    })
})

module.exports = router;
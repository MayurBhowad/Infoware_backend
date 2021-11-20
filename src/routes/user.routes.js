const router = require('express').Router();

const mysqlConnection = require('../config/db.conn');
const { authenticateUser } = require('../services/auth.service');
const { getAllUser, getUserById, registerUser } = require('../services/user.service');


/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName 
 *                  - email
 *                  - password
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
 *          InputUser:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName 
 *                  - email
 *                  - password
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
 *              example:
 *                  firstName: John
 *                  lastName: Doe
 *                  email: john@gmail.com
 *                  password: 123
 *          LoginUser:
 *              type: object
 *              required: 
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Email of user
 *                  password:
 *                      type: string
 *                      description: password for account
 *              example:
 *                  email: john@gmail.com
 *                  password: 123
 *          LoginResponse:
 *              type: object
 *              properties:
 *                  success:
 *                      type: boolean
 *                      description: is operation passed or faild
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  token:
 *                      type: string
 *                      description: token
 *              example:
 *                  success: true
 *                  email: john@gmail.com
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6Ikpshdku.eyJ1c2VyaWQiOjEsImlhdCI6MTYzNzQwNTcyMiwiZXhwIjoxNjM3NDEyOTIyfQ.0qMwf3Dc9gAXg3ZYx9PLEIUrGfxdvQmkfn3_Zret08U
 *      responses:
 *          404NotFound:       # Can be referenced as '#/components/responses/404NotFound'
 *              description: The specified resource was not found.
 */



//@desc     get all users
//@route    GET /api/user
//access    public
/**
 * @swagger
 * /api/user:
 *      get:
 *          summary: return the list of All users.
 *          tags: [User]
 *          responses:
 *              200:
 *                  description: The list of users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 *              404:
 *                  description: Users Not Found
 *                              
 */
router.get('/', async (req, res) => {
    getAllUser().then(users => {
        res.json(users)
    })
        .catch(err => {
            res.status(500).json(err)
        })

})

//@desc     get users by id
//@route    GET /api/user/:id
//access    public
/**
 * @swagger
 * /api/user/{id}:
 *      get:
 *          summary: return user by specific id
 *          tags: [User]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                  required: true
 *                  description: The user id
 *          responses:
 *              200:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/User'
 *              404:
 *                  description: The user not found  
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let data = await getUserById(id)        //returns []
    if (data.length > 0) {
        res.send(data)
    } else {
        res.status(404).send('data not found')
    }
})

//@desc     register user
//@route    POST /api/user
//access    public
/**
 * @swagger
 * /api/user:
 *      post:
 *          summary: Register new user
 *          tags: [User]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/InputUser'
 *          responses:
 *              200:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/User'
 *              404:
 *                  description: The user not found  
 */
router.post('/', (req, res) => {
    registerUser(req.body).then(token => {
        let ress = {}
        ress.success = true;
        ress.token = token
        res.send(ress);
    }).catch(err => {
        res.status(500).send({ success: false, error: err })
    })
})

//@desc     login user
//@route    POST /api/user/login
//access    public
/**
 * @swagger
 * /api/user/login:
 *      post:
 *          summary: Login user
 *          tags: [User]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginUser'
 *          responses:
 *              200:
 *                  description:
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/LoginResponse'
 *              404:
 *                  description: The user not found  
 */
router.post('/login', (req, res) => {
    authenticateUser(req.body).then(token => {
        let ress = {
            success: true,
            email: req.body.email,
            token: token
        }
        res.json(ress)
    }).catch(err => {
        res.status(500).json(err)
    })
})



module.exports = router;
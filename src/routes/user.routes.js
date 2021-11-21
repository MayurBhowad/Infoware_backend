const router = require('express').Router();

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
 *                  password: "123"
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
 *                  password: "123"
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
 *                  password: "123"
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: false
 *                                  message: user not found
 *                              
 */
router.get('/', async (req, res) => {
    getAllUser().then(users => {
        res.json({ success: true, users: users })
    })
        .catch(err => {
            res.status(500).json({ success: false, error: err })
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: false
 *                                  message: user not found!
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let user = await getUserById(id)
    if (user) {
        res.send({ success: true, user: user })
    } else {
        res.status(404).send({ success: false, message: 'User not found!' })
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
        if (err.errno === 1062) {
            return res.status(400).send({ success: false, error: err.sqlMessage })
        }
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
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: object
 *                                  example:
 *                                      success: true
 *                                      email: "john@gmail.com"
 *                                      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCas.eyJ1c2VyaWQiOjEsImVtYWlsIjoibmlja0BnbWFpbC5jb20iLCJpYXQiOjE2Mzc0NDIxMDQsImV4cCI6MTYzNzQ0OTMwNH0.B02KwJWt_C74TDgybHNBwZDb4bKHq9Ihu0u1yHERJwU"
 *              400:
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: object
 *                                  example:
 *                                      success: false
 *                                      message: Pasword check faild
 *              404:
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: object
 *                                  example:
 *                                      success: false
 *                                      message: user not found
 *               
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
        res.status(err.status).json({ success: false, message: err.message })
    })
})



module.exports = router;
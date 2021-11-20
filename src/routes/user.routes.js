const router = require('express').Router();

const mysqlConnection = require('../config/db.conn');
const { authenticateUser } = require('../services/auth.service');
const { getAllUser, getUserById, registerUser } = require('../services/user.service');

//@desc     get all users
//@route    GET /api/user
//access    public
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
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let data = await getUserById(id)
    if (data.length > 0) {
        res.send(data)
    } else {
        res.send('data not found')
    }
})

//@desc     register user
//@route    POST /api/user
//access    public
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
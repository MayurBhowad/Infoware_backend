const router = require('express').Router();

const { authenticateUser } = require('../services/auth.service');
const { getAllUser, getUserById, registerUser } = require('../services/user.service');

//@desc     get all users
//@route    GET /api/user
//access    public
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
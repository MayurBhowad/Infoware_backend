const router = require('express').Router();
const mysqlConnection = require('../config/db.conn');
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
    registerUser(req.body).then(user => {
        res.send('user added successfullY!');
    }).catch(err => {
        res.status(500).send(err)
    })
})



module.exports = router;
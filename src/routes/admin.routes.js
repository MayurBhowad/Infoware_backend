const { addUser } = require('../services/user.service');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ msg: 'admin routes passed!' })
})

//@desc     add user
//@route    POST /api/admin
//access    public
router.post('/', (req, res) => {
    addUser(req.body).then(ress => {
        res.send('user added')
    }).catch(err => {
        res.status(500).send(err);
    })
})

module.exports = router;
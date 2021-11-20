const { addUser } = require('../services/user.service');
const auth = require('../middleware/auth.middleware')

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ msg: 'admin routes passed!' })
})

//@desc     add user
//@route    POST /api/admin
//access    public
router.post('/', auth, (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ success: false, message: 'Access denied!' })
    }
    addUser(req.body).then(userid => {
        res.send({ success: true, insertId: userid })
    }).catch(err => {
        res.status(500).send({ success: false, error: err });
    })
})

module.exports = router;
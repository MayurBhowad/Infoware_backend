const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ msg: 'admin routes passed!' })
})

module.exports = router;
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ msg: 'user routes passed!' })
})

module.exports = router;
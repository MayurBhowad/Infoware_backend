const router = require('express').Router();

router.use('/user', require('./user.routes'))
router.use('/admin', require('./admin.routes'))

module.exports = router;
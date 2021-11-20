const router = require('express').Router();

router.use('/user', require('./user.routes'))
router.use('/admin', require('./admin.routes'))
router.use('/product', require('./product.routes'))

module.exports = router;
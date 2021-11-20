const router = require('express').Router();
const auth = require('../middleware/auth.middleware');

const mysqlConnection = require('../config/db.conn');

router.get('/', (req, res) => {
    res.send('products test pass')
})

module.exports = router;

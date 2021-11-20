const mysqlConnection = require("../config/db.conn")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function generateToken(id, email) {
    return jwt.sign({ userid: id, email }, 'secret', { expiresIn: "2h" });
}

const authenticateUser = data => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(`select userid, email, passwd from user where email = "${data.email}"`, async (err, rows) => {
            if (err) {
                reject(err)
            } else {
                let user = rows[0]
                if (await bcrypt.compare(data.password, user.passwd)) {
                    resolve(generateToken(user.userid, user.email))
                } else {
                    reject('password check failed')
                }
            }
        })
    })
}

module.exports = { authenticateUser }

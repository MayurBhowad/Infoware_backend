const mysqlConnection = require("../config/db.conn")


const isUserAdmin = (id) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(`select userid, firstName, lastName,email, isAdmin from user where userid = "${id}"`, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                let user = rows[0]
                if (user.isAdmin === 1) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })
}

module.exports = { isUserAdmin }
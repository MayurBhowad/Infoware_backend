const mysqlConnection = require("../config/db.conn")


const isUserAdmin = (id) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(`select userid, firstName, lastName,email, isAdmin from user where userid = "${id}"`, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows[0])
            }
        })
    })
}

module.exports = { isUserAdmin }
const mysqlConnection = require("../config/db.conn")

const getAllUser = () => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query('select userid, firstName, lastName, email,creation_time, modification_time from user', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

const getUserById = id => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query('select userid, firstName, lastName, email,creation_time, modification_time from user where userid = ?', [id], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

const registerUser = (data) => {
    let sqlQuery = `insert into user(firstName, lastName, email, passwd) values("${data.firstName}","${data.lastName}","${data.email}","${data.passwd}")`;
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sqlQuery, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }

        })
    })
}

const addUser = (data) => {
    let sqlQuery = `insert into user(firstName, lastName, email, passwd, isAdmin) values("${data.firstName}","${data.lastName}","${data.email}","${data.passwd}",${data.isAdmin})`;
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sqlQuery, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }

        })
    })
}

module.exports = { getAllUser, getUserById, registerUser, addUser }

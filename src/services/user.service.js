const mysqlConnection = require("../config/db.conn")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAllUser = () => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query('select userid, firstName, lastName, email from user', (err, rows) => {
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
        mysqlConnection.query('select userid, firstName, lastName, email from user where userid = ?', [id], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

const registerUser = async (data) => {
    let encryptedPassword = await bcrypt.hash(data.password, 10);

    function generateToken(id, email) {
        return jwt.sign({ userid: id, email }, 'secret', { expiresIn: "2h" });
    }

    let sqlQuery = `insert into user(firstName, lastName, email, passwd) values("${data.firstName}","${data.lastName}","${data.email}","${encryptedPassword}")`;
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sqlQuery, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(generateToken(rows.insertId, data.email))
            }

        })
    })
}

const addUser = async (data) => {
    let encryptedPassword = await bcrypt.hash(data.password, 10);
    let sqlQuery = `insert into user(firstName, lastName, email, passwd, isAdmin) values("${data.firstName}","${data.lastName}","${data.email}","${encryptedPassword}",${data.isAdmin})`;
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

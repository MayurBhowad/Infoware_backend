const mysqlConnection = require("../config/db.conn")

const getAllProduct = () => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(`select * from products`, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

const addProduct = (data) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(`insert into products(productTitle, productPrice, productDetails) values("${data.productTitle}", ${data.productPrice}, "${data.productDetails}")`, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows.insertId)
            }
        })
    })
}

module.exports = { getAllProduct, addProduct }
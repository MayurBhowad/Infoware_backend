const mysqlConnection = require("../config/db.conn")
const short = require('short-uuid');


const newOrder = (data) => {
    return new Promise((resolve, reject) => {
        let id = short.generate();
        let record = {
            id: id,
            products: data
        }
        data.map((el, i) => {
            mysqlConnection.query(`insert into orders(orderid, productid, quantity) values("${id}", ${el.productid}, ${el.quantity})`, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject({ status: 500, message: 'unsuccessfull' })
                }
            })
            if (data.length === i + 1) {
                resolve({ record });
            }
        })
    })
}

module.exports = { newOrder }
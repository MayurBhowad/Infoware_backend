const mysqlConnection = require("../config/db.conn")
const short = require('short-uuid');


const newOrder = (data, userid) => {
    return new Promise((resolve, reject) => {
        let id = short.generate();
        let record = {
            id: id,
            userid: userid,
            products: data
        }
        data.map((el, i) => {
            mysqlConnection.query(`insert into orders(orderid, userid, productid, quantity) values("${id}", ${userid}, ${el.productid}, ${el.quantity})`, (err, rows) => {
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
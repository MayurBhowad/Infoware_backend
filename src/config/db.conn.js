
const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

mysqlConnection.connect(err => {
    if (!err) {
        console.log('Connection Established Successfully');
    } else {
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
    }
})

module.exports = mysqlConnection

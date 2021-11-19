
const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql10924',
    database: 'infoware',
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

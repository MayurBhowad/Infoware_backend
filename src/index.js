const express = require('express');
const cors = require('cors');
const mysqlConnection = require('./config/db.conn');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api', require('./routes'))

app.listen(PORT, () => console.log(`API is up and Rolling...`));

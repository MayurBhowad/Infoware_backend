const express = require('express');
const cors = require('cors');
const mysqlConnection = require('./config/db.conn');
require('dotenv').config({ path: __dirname + '/.env' })

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Infoware backend",
            version: "1.0.0",
            description: "backend for Infoware system"
        },
        servers: [{ url: "http://localhost:4001" }, { url: "https://infoware01.herokuapp.com" }],
    },
    apis: [`./src/routes/*.routes.js`,]
}

const specs = swaggerJsDoc(options)

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use('/api', require('./routes'))

app.listen(PORT, () => console.log(`API is up and Rolling...`));

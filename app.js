const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
global.Sequelize = require('sequelize')
global.sequelize = new Sequelize(
    "dbForNode", "sa", "1230",
    {
        dialect: "mssql",
        host: "localhost",
        port: "1433",
        dialectOptions: {
            encrypt: true
          }
    }
)
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
app.use('/', require('./Controllers'))
app.listen(3000)



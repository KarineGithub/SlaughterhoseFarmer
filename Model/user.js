const express = require('express')
const router = express()
global.User = sequelize.define('users',
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
    freezeTableName: true
}
);
router.use('/slaughterhouse', require('./slaughterhouse'))
router.use('/farmer', require('./farmer'))

module.exports = router
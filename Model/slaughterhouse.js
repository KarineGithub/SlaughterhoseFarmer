const express = require('express')
const router = express()
global.Slaughterhouse = sequelize.define('slaughterhouses',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);
User.hasMany(Slaughterhouse, { foreignKey: 'userId' })
Slaughterhouse.belongsTo(User, { foreignKey: 'userId' })
router.use('/login', require('../Controllers/forAuth/slaughterhouse/SlLogin'))
router.use('/signup', require('../Controllers/forAuth/slaughterhouse/SlSignup'))
module.exports = router
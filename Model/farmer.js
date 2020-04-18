const express = require('express')
const router = express()
global.Farmer = sequelize.define('farmers',
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
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
User.hasMany(Farmer, { foreignKey: 'userId' })
Farmer.belongsTo(User, { foreignKey: 'userId' })


router.use('/signup', require('../Controllers/forAuth/farmer/farmerSignup'))
router.use('/login', require('../Controllers/forAuth/farmer/farmerLogin'))
module.exports = router
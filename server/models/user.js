const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserData = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = UserData;
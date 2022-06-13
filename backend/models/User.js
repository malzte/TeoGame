const Sequelize = require('sequelize');
const config = require('../config');

const User = config.define('users', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    last_name: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    street_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postalcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    interests: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {timestamps: false});


module.exports = User;
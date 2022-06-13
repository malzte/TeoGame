const Sequelize = require('sequelize');
const config = new Sequelize('capstone', 'root', 'password', {dialect: 'mysql'});

module.exports = config;
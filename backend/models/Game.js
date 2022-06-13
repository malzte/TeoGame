const Sequelize = require('sequelize');
const config = require('../config');

const Game = config.define('games',  {
    game_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }, 
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {timestamps: false});

module.exports = Game;
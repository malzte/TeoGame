const Sequelize = require('sequelize');
const config = require('../config');

const Listing = config.define('listings', {
    listing_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date_created: {
        type: Sequelize.DATE,
        allowNull: true
    },
    type: {
        type: Sequelize.ENUM("Rent","Buy","Trade","Sell"),
        defaultValue:"Sell",
        allowNull: false
    },
    game_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    title:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    }  
}, {timestamps: false});

module.exports = Listing;
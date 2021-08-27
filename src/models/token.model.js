const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Token extends Model { };

Token.init({
    value: {type: Sequelize.STRING, allowNull: false },
}, {
    sequelize,
    timestamps: true,
    modelName: 'tokens',
});

module.exports = Token;

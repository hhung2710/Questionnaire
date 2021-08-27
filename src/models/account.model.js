const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Account extends Model { };

Account.init({
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    score: { type: Sequelize.DECIMAL },
    role: { type: Sequelize.STRING, allowNull: false },
}, {
    sequelize,
    timestamps: true,
    modelName: 'accounts',
});

module.exports = Account;

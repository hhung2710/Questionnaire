const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define(
	'accounts',
	{
		username: { type: Sequelize.STRING, allowNull: false },
		password: { type: Sequelize.STRING, allowNull: false },
		email: { type: Sequelize.STRING, allowNull: false },
		score: { type: Sequelize.DECIMAL },
	},
	{
		timestamps: true,
	}
);

module.exports = Account;

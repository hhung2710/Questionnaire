const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = require('./account.model');
db.question = require('./question.model');


module.exports = db;
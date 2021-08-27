const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Question extends Model { };

Question.init({
    question_Name: { type: Sequelize.STRING, allowNull: false },
    correct_Answer: { type: Sequelize.STRING, allowNull: false },
    option1: { type: Sequelize.STRING },
    option2: { type: Sequelize.STRING },
    option3: { type: Sequelize.STRING },
    option4: { type: Sequelize.STRING },
}, {
    sequelize,
    timestamps: true,
    modelName: 'questions',
});

module.exports = Question;

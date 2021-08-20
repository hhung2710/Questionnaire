const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Question = sequelize.define(
    'questions',
    {
        question_Name: { type: Sequelize.STRING, allowNull: false },
        correct_Answer: { type: Sequelize.STRING, allowNull: false },
        option1: { type: Sequelize.STRING },
        option2: { type: Sequelize.STRING },
        option3: { type: Sequelize.STRING },
        option4: { type: Sequelize.STRING },
    },
    {
        timestamps: true,
    }
);

module.exports = Question;

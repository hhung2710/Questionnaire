const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const Question = db.questions;
const Account = db.accounts;

async function checkInputQuestion(title, option1, option2, option3, option4, answer) {
  const arr = [option1, option2, option3, option4];
  let checkAnswer = false;
  arr.forEach(element => {
    if (element == answer) {
      checkAnswer = true;
    }
  });
  if (!checkAnswer) {
    throw new ApiError(httpStatus.CONFLICT, 'Câu trả lời phải đúng phải trùng với 1 câu trả lời');
  }
  const checkTitle = await Question.findOne({ where: { question_Name: title } });
  if (checkTitle !== null) {
    throw new ApiError(httpStatus.CONFLICT, 'Câu hỏi đã tồn tại');
  }
}

exports.addNew = async (title, option1, option2, option3, option4, answer) => {
  await checkInputQuestion(title, option1, option2, option3, option4, answer);
  return Question.create({
    question_Name: title,
    correct_Answer: answer,
    option1,
    option2,
    option3,
    option4,
  })
}

exports.findAll = async () => {
  const question = await Question.findAll();
  return question;
}

exports.delete = async (id) => {
  const question = await Question.findByPk(id);
  return question.destroy();
}

exports.update = async (id, title, option1, option2, option3, option4, answer) => {
  const getQuestion = await Question.findByPk(id);
  if (getQuestion === null) {
    throw new ApiError(httpStatus.CONFLICT, 'Câu hỏi không tồn tại');
  }
  await checkInputQuestion(title, option1, option2, option3, option4, answer);
  return getQuestion.update({
    question_Name: title,
    correct_Answer: answer,
    option1,
    option2,
    option3,
    option4,
  })
}

exports.createQuiz = async () => {
  const allQuestion = await Question.findAndCountAll({
    attributes: ['question_Name', 'option1', 'option2', 'option3', 'option4'],
    raw: true,
  });
  if (allQuestion.count < 10) {
    throw new ApiError(httpStatus.CONFLICT, 'Số lượng câu hỏi không đủ, vui lòng liên hệ admin');
  } else {
    const quiz = [];
    for (let index = 0; index < 10; index++) {
      var randomQuestion = allQuestion.rows[Math.floor(Math.random() * allQuestion.rows.length)];
      quiz.push(randomQuestion);
      allQuestion.rows.splice(allQuestion.rows.indexOf(randomQuestion), 1);
    }
    return quiz;
  }
}

exports.checkResult = async (result, id) => {
  var score = 0;
  for (const element of result) {
    let question = await Question.findOne({ where: { question_Name: element.question_Name } });
    if (element.answer == question.correct_Answer) {
      score = score + 10;
    }
  }
  const account = await Account.findByPk(id);
  account.update({ score });
  return score;
}


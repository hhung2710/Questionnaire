const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const service = require('../services');
const questionService = service.question;
const config = require('../config/config');

const addQuestion = catchAsync(async (req, res) => {
    const { title, option1, option2, option3, option4, answer } = req.body;
    const question = await questionService.addNew(title, option1, option2, option3, option4, answer);
    res.status(httpStatus.CREATED).send({ question });
});

const getAll = catchAsync(async (req, res) => {
    const question = await questionService.findAll();
    res.status(httpStatus.ACCEPTED).send({ question });
});

const deleteQuestion = catchAsync(async (req, res) => {
    const id = req.params.id;
    await questionService.delete(id);
    res.status(httpStatus.ACCEPTED).send("Deleted");
});

const updateQuestion = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { title, option1, option2, option3, option4, answer } = req.body;
    const question = await questionService.update(id, title, option1, option2, option3, option4, answer);
    res.status(httpStatus.ACCEPTED).send({ question });
});

const generateQuiz = catchAsync(async (req, res) => {
    const quiz = await questionService.createQuiz();
    res.status(httpStatus.ACCEPTED).send({ quiz });
});

const calculateScore = catchAsync(async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = await jwt.verify(token, config.jwt.secret);
    const result = req.body.result;
    const score = await questionService.checkResult(result, data.id);
    res.status(httpStatus.ACCEPTED).send({ score });
})

module.exports = {
    addQuestion,
    getAll,
    deleteQuestion,
    updateQuestion,
    generateQuiz,
    calculateScore
};
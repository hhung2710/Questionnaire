const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const service = require('../services');
const userService = service.user;


const updateAccount = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = await jwt.verify(token, config.jwt.secret);
    const account = await userService.update(data.id, email, password);
    res.status(httpStatus.OK).send({ account });
});

const getTop3Score = catchAsync(async (req, res) => {
    const top3 = await userService.getTop3();
    res.status(httpStatus.OK).send({ top3 });
});


module.exports = {
    updateAccount,
    getTop3Score
};
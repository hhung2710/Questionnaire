const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const db = require('../models/');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const Account = db.accounts;
const blacklist = db.tokens;

exports.authentication = catchAsync(async (req, res, next) => {
    const header = req.header('Authorization');
    if (!header) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Không có token');
    }
    const token = header.replace('Bearer ', '');
    const data = await jwt.verify(token, config.jwt.secret);
    const account = await Account.findByPk(data.id);
    if (account === null) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Không được truy cập');
    }
    const check = await blacklist.findAll({ where: { value: token } });
    if (check.length === 0) {
        await jwt.verify(token, config.jwt.secret);
        next();
    } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Không được truy cập');
    }
});

exports.checkAdmin = catchAsync(async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = await jwt.verify(token, config.jwt.secret);
    const account = await Account.findByPk(data.id);
    if (account.role === 'admin') {
        next();
    } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Không được truy cập');
    }
});

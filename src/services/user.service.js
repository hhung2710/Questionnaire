const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const Account = db.accounts;

exports.getAccountByUsername = async (key) => {
    return Account.findOne({ where: { username: key } });
};

exports.getAccountByEmail = async (key) => {
    return Account.findOne({ where: { email: key } });
};

exports.update = async (id, email, password) => {
    const user = await Account.findByPk(id);
    const checkEmail = await this.getAccountByEmail(email);
    if (checkEmail !== null) {
        throw new ApiError(httpStatus.CONFLICT, 'Email đã tồn tại');
    } else {
        const hashedPassword = await bcrypt.hash(password, 8);
        return user.update({
            password: hashedPassword,
            email
        });
    }
};

exports.getTop3 = async (id, email, password) => {
    const account = await Account.findAll({
        attributes: ['username', 'score'],
        order: [
            ['score', 'DESC']
        ],
        limit: 3
    });
    return account;
};
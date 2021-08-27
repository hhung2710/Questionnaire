const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const db = require('../models');
const userService = require('./user.service');
const Account = db.accounts;

exports.signup = async (username, password, email, role) => {
  const checkUsername = await userService.getAccountByUsername(username);
  const checkEmail = await userService.getAccountByEmail(email);
  if (checkUsername !== null) {
    throw new ApiError(httpStatus.CONFLICT, 'Username đã tồn tại');
  } else if (checkEmail !== null) {
    throw new ApiError(httpStatus.CONFLICT, 'Email đã tồn tại');
  } else {
    const hashedPassword = await bcrypt.hash(password, 8);
    return Account.create({
      username,
      password: hashedPassword,
      email,
      role
    });
  }
}

exports.login = async (username, password) => {
  const account = await userService.getAccountByUsername(username);
  if (account === null || !await bcrypt.compare(password, account.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Tên tài khoản hoặc mật khẩu không đúng');
  }
  return account;
};
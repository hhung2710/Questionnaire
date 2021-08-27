const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../models');

const Token = db.tokens;

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expire
    });
};

const saveTokenBlacklisted = async (token) => {
    await Token.create({ value: token });
};

module.exports = {
    generateToken,
    saveTokenBlacklisted,
};
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const service = require('../services');
const authService = service.auth;
const tokenService = service.token;

const register = catchAsync(async (req, res) => {
    const { username, password, email } = req.body;
    const role = 'user';
    const account = await authService.signup(username, password, email, role);
    res.status(httpStatus.CREATED).send({ account });
});

const login = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const account = await authService.login(username, password);
    const token = await tokenService.generateToken(account.id);
    res.status(httpStatus.ACCEPTED).send({ account, token });
});

const logout = catchAsync(async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    await tokenService.saveTokenBlacklisted(token);
    res.status(httpStatus.RESET_CONTENT).send("logouted");
});


module.exports = {
    register,
    login,
    logout,
};
const express = require('express');
const controller = require('../../controllers');
const mid = require('../../middlewares/auth');
const authController = controller.auth;

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', mid.authentication, authController.logout);

module.exports = router;
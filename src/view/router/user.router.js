const express = require('express');
const controller = require('../../controllers');
const mid = require('../../middlewares/auth');
const userController = controller.user;


const router = express.Router();

router.put('/update', mid.authentication, userController.updateAccount);

router.get('/top3', mid.authentication, userController.getTop3Score);


module.exports = router;
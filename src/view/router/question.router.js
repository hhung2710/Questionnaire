const express = require('express');
const controller = require('../../controllers');
const mid = require('../../middlewares/auth');
const questionController = controller.question;


const router = express.Router();

router.post('/addQuestion', mid.authentication, mid.checkAdmin, questionController.addQuestion);

router.get('/getAll', mid.authentication, questionController.getAll);

router.put('/update/:id', mid.authentication, mid.checkAdmin, questionController.updateQuestion);

router.delete('/delete/:id', mid.authentication, mid.checkAdmin, questionController.deleteQuestion);

router.get('/quiz', mid.authentication, questionController.generateQuiz);

router.post('/result', mid.authentication, questionController.calculateScore);

module.exports = router;
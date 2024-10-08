const express = require('express');
const router = express.Router();
const questionPostController = require('../controllers/questionPostController');
const authenticate = require('../middleware/authenticate');
const questionGetController = require('../controllers/questionGetController');

// Route to create a new question (using POST)
router.post('/createQuestion', authenticate, questionPostController.createQuestion);
router.get('/getQuestions', authenticate, questionGetController.getQuestions);
router.get('/getQuestionsbyUser', authenticate, questionGetController.questionByuser);
router.get('/getQuestion/:id', authenticate, questionGetController.getQuestinonById);
router.put('/updateUpvote/:id/upvote', authenticate, questionPostController.updateUpvote);
router.put('/updateQuetion/:id', authenticate, questionPostController.updaateQuestion);
router.post('/createQuestion', authenticate, questionPostController.createQuestion);
router.delete('/deleteQuestion/:id', authenticate, questionPostController.deleteQuestion);

module.exports = router;

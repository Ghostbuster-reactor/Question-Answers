const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

//Questions Routes
router.get('/qa/questions', controllers.getQuestions);
router.post('/qa/questions', controllers.addQuestion);

router.get('/qa/questions/:question_id/answers', controllers.getQAnswers);
router.post('/qa/questions/:question_id/answers', controllers.addAnAnswer);
router.put('/qa/questions/:question_id/helpful', controllers.addHelpfulQuestion);
router.put('/qa/questions/:question_id/report', controllers.addReportedQuestion);
router.put('/qa/answers/:answer_id/helpful', controllers.addHelpfulAnswer);
router.put('/qa/answers/:answer_id/report', controllers.addReportedAnswer);

module.exports = router;
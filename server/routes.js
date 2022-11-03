const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

//Questions Routes
router.get('/qa/questions', controllers.getQuestions);
// router.get('/qa/questions/:question_id/answers', controllers.qnas.getAs);
// router.post('/qa/questions', controllers.qnas.addQ);
// router.post('/qa/questions/:question_id/answers', controllers.qnas.addA);
// router.put('/qa/questions/:question_id/helpful', controllers.qnas.markQHelpful);
// router.put('/qa/questions/:question_id/report', controllers.qnas.reportQ);
// router.put('/qa/answers/:answer_id/helpful', controllers.qnas.markAHelpful);
// router.put('/qa/answers/:answer_id/report', controllers.qnas.reportA);

module.exports = router;
const express = require('express');
const models = require('../models')

module.exports = {
  getQuestions: (req, res) => {
    var params = req.query; // get params must be in an array
    models.getAllQuestions(params,(err, result) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(result).end();
      }
    })
  },
  addQuestion: (req, res) => {
    var params = req.body; //post params are objects with keys and values
    models.postQuestion(params, (err, result) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(201).end(); // will we handle new get on the front-end to ensure new question shows up?
      }
    })
  },
  getQAnswers: (req, res) => {
    var params = [req.params.question_id]; // get params must be in an array
    models.getAnswers(params,(err, result) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(result).end();
      }
    })
  },
  addAnAnswer: (req, res) => {
    var params = req.body;
    params.question_id = req.params.question_id;
  models.postAnswer(params, (err, result) => {
    if (err) {
      res.sendStatus(500).end();
    } else {
      res.send(201).end(); // will we handle new get on the front-end to ensure new question shows up?
    }
  })
},
addHelpfulQuestion: (req, res) => {
  models.putHelpfulQuestion(req.params.question_id, (err, result) => {
    if (err) {
      res.sendStatus(500).end();
    } else {
      res.sendStatus(204).end();
    }
  })
},
addReportedQuestion: (req, res) => {
  models.reportQuestion(req.params.question_id, (err, result) => {
    if (err) {
      res.sendStatus(500).end();
    } else {
      res.sendStatus(204).end();
    }
  })
},
addHelpfulAnswer: (req, res) => {
  models.putHelpfulAnswer(req.params.answer_id, (err, result) => {
    if (err) {
      res.sendStatus(500).end();
    } else {
      res.sendStatus(204).end();
    }
  })
},
addReportedAnswer: (req, res) => {
  models.reportAnswer(req.params.answer_id, (err, result) => {
    if (err) {
      res.sendStatus(500).end();
    } else {
      res.sendStatus(204).end();
    }
  })
},

};
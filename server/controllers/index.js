const express = require('express');
const models = require('../models')

module.exports = {
  getQuestions: (req, res) => {
    console.log(req.query)
    var params = req.query; // get params must be in an array
    // var params = [req.query.product_id]; // get params must be in an array
    models.getAllQuestions(params,(err, result) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(result).end();
      }
    })
  },
  addQuestion: (req, res) => {
    console.log('req query in models add Question', req.body);
    var params = req.body; //post params are objects with keys and values

    models.postQuestion(params, (err, result) => {
      if (err) {
        console.log('error', err);
        res.sendStatus(500).end();
      } else {
        res.send(result).end(); // will we handle new get on the front-end to ensure new question shows up?
      }
    })
  },
  getQAnswers: (req, res) => {
    // console.log(req)
    var params = [req.params.question_id]; // get params must be in an array
    // var params = [req.query.product_id]; // get params must be in an array
    models.getAnswers(params,(err, result) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(result).end();
      }
    })
  }

};
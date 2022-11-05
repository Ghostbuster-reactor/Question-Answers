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
    console.log('req query in Controllers add Question', req.body);
    var params = req.body; //post params are objects with keys and values

    models.postQuestion(params, (err, result) => {
      if (err) {
        console.log('error', err);
        res.sendStatus(500).end();
      } else {
        res.send(201).end(); // will we handle new get on the front-end to ensure new question shows up?
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
  },
  addAnAnswer: (req, res) => {
    console.log('req in Controller addAnswer', req.params);

  var params = Object.values(req.body); //post params are objects with keys and values
  params.unshift(Number(req.params.question_id));

  models.postAnswer(params, (err, result) => {
    if (err) {
      console.log('error', err);
      res.sendStatus(500).end();
    } else {
      res.send(201).end(); // will we handle new get on the front-end to ensure new question shows up?
    }
  })
},
addHelpfulQuestion: (req, res) => {
  console.log(req.params);
  models.putHelpfulQuestion(req.params.question_id, (err, result) => {
    if (err) {
      res.semdStatus(500).end();
    } else {
      res.sendStatus(204).end();
    }
  })
}

};
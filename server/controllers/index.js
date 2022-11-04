const express = require('express');
const models = require('../models')

module.exports = {
  getQuestions: (req, res) => {
    var params = [req.query.product_id]; // params must be in an array
    models.getAllQuestions(params,(err, result) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(result).end();
      }
    })
  },
  addQuestion: (req, res) => {
    console.log('controllers tripped');
    console.log('req query in models add Question',req.query, req.body);
    var params = Object.values(req.body);
    params.push(req.body.product_id);
    models.postQuestion(params, (err, result) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(result).end(); // will we handle new get on the front-end to ensure new question shows up?
      }
    })
  }

};
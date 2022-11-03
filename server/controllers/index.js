const express = require('express');
const models = require('../models')

module.exports = {
  getQuestions: (req, res) => {
    console.log(req.query);
    var params = [req.query.product_id];
    models.getAllQuestions(params,(err, result) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(result).end();
      }
    })
  }
}



  // app.get('/', (req, res) => {
  //   console.log('GET REQUEST', req);
  //   pool.query('SELECT * from questions offset 1000 limit 50;', (err, result) => {
  //     if (err) throw err;
  //     res.status(200);
  //     res.send(result.rows);
  //   })
  // })








// };

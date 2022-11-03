const express = require('express');
const pool = require('../database/db.js');


module.exports = {

  getAllQuestions: function(params, callback) {
    console.log('params in model.js', params);
    // params = params.toString();
    var queryString = "SELECT * from questions WHERE product_id=$1";
    // var queryString = "SELECT * from questions offset 10 limit 5";

    pool.query(queryString, params, (err, results) => {
      if (err) {
        callback(err.code);
      } else {
        console.log('results of getAllQuestions in models', results.rows);
        callback(null, results.rows);
      }
    });
  }
}
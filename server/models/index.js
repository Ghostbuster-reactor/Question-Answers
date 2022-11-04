const express = require('express');
const pool = require('../database/db.js');
const db = require('../database/db.js');


//might try to promisify these or use the promisification of db.
module.exports = {
  getAllQuestions: (params, callback) => { //I'd like to pull all the questions and then cache the data locally. Alternatively, I can limit the qty requested to 2, but I would have to handle incrementing the offset here.
    var queryString = "SELECT * from questions WHERE product_id=$1 LIMIT 100";
    pool.query(queryString, params, (err, results) => {
      if (err) {
        callback(err.code);
      } else {
        callback(null, results.rows);
      }
    });
  },
  postQuestion: (params, callback) => {

    var queryString = "INSERT INTO table questions (body, name, email, product_id) VALUES ($1, $2, $3, $4) WHERE product_id=$5";
    console.log('params in models.postQuestion',params);
    pool.query(queryString, params, (err, results) => {
      if (err) {
        callback(err.code);
      } else {
        callback(null, results);
      }
    });

  }




}
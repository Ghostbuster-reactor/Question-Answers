const express = require('express');
const pool = require('../database/db.js');
const db = require('../database/db.js');

let incomingProductID = 0;
let incomingPageOffset = 1; //this should show however many the limit is
let incomingLimit = 5;
let sameProduct = false;
let sameCount = false;


//might try to promisify these or use the promisification of db.
module.exports = {
  getAllQuestions: (params, callback) => {
    console.log('params', params.product_id);
    params = [params.product_id];

    var queryString = `SELECT json_build_object('product_id', '${params[0]}', 'results', ARRAY((SELECT json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported, 'answers', (SELECT json_object_agg(a2.id, (SELECT json_build_object('id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported, 'photos',
    (SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=a2.id))))FROM answers a2 WHERE question_id=o1.id)) FROM questions o1 WHERE product_id=$1 ORDER BY o1.helpful DESC LIMIT 5)));`

    pool.query(queryString, params, (err, results) => {
      if (err) {
        callback(err.code);
      } else {
        console.log(results.rows)
        callback(null, results.rows[0].json_build_object);
      }
    });
  },

  postQuestion: (params, callback) => {
    //the params have to come in as an object, but have to become an array to work with postgres

    params = Object.values(params);
    var queryString = "INSERT INTO questions (body, asker_name, asker_email, product_id) VALUES ($1, $2, $3, $4)";
    pool.query(queryString, params, (err, results) => {
      if (err) {
        callback(err.code, err);
      } else {

        callback(null, results);
      }
    });
  },
  getAnswers: (params, callback) => { //need to add page and count and defaults
      console.log(params[0]);
      // params = params[0];
    var queryString = `SELECT json_build_object('question', '${params[0]}', 'page', 1, 'count', 5, 'results', ARRAY((SELECT json_build_object('answer_id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported, 'photos', (SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=a2.id)) FROM answers a2 WHERE question_id=$1 ORDER BY a2.helpful DESC)));`
    // var queryString = "SELECT * from answers WHERE question_id=$1"; //I am going to have to work on this!! My objects need joins and better key names
    pool.query(queryString, params, (err, results) => {
      if (err) {
        callback(err.code);
      } else {

        callback(null, results.rows[0].json_build_object);
      }
    });
  },

  postAnswer: (params, callback) => {
    //the params have to come in as an object, but have to become an array to work with postgres
    console.log('params in  model index', params)
    var urls = params.pop();
    console.log('params in  model index', params)

    var queryString = "INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4)"; //edit for adding photos
    pool.query(queryString, params, (err, results) => {
      if (err) {
        callback(err.code, err);
      } else {
        console.log('results', results); //multiple queries to get answer_id?
        callback(null, results);
      }
    });
  },
  putHelpfulQuestion: (params, callback) => {
    console.log(params);
    var queryString = "UPDATE questions\
      SET helpful = helpful + 1\
      WHERE id=$1";
      pool.query(queryString, params, (err, results) => {
        if (err) {
          callback(err.code, err);
        } else {
          console.log('results', results); //multiple queries to get answer_id?
          callback(null, results);
        }
      })
  },
  reportQuestion: (params, callback) => {
    console.log(params);
    var queryString = "UPDATE questions\
      SET reported = true\
      WHERE id=$1";
      pool.query(queryString, params, (err, results) => {
        if (err) {
          callback(err.code, err);
        } else {
          console.log('results', results); //multiple queries to get answer_id?
          callback(null, results);
        }
      })
  },
  putHelpfulAnswer: (params, callback) => {
    console.log(params);
    var queryString = "UPDATE answers\
      SET helpful = helpful + 1\
      WHERE id=$1";
      pool.query(queryString, params, (err, results) => {
        if (err) {
          callback(err.code, err);
        } else {
          console.log('results', results); //multiple queries to get answer_id?
          callback(null, results);
        }
      })
  },
  reportAnswer: (params, callback) => {
    console.log(params);
    var queryString = "UPDATE answers\
      SET reported = true\
      WHERE id=$1";
      pool.query(queryString, params, (err, results) => {
        if (err) {
          callback(err.code, err);
        } else {
          console.log('results', results); //multiple queries to get answer_id?
          callback(null, results);
        }
      })
  }
}
const express = require('express');
const pool = require('../database/db.js');
const db = require('../database/db.js');



//might try to promisify these or use the promisification of db.
module.exports = {
  getAllQuestions: (params, callback) => {
    console.log('params', params.product_id);
    params = [params.product_id];

    var queryString = `SELECT json_build_object('product_id', '${params[0]}', 'results', ARRAY((SELECT json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported, 'answers', (SELECT json_object_agg(a2.id, (SELECT json_build_object('id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported, 'photos',
    (SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=a2.id))))FROM answers a2 WHERE question_id=o1.id)) FROM questions o1 WHERE product_id=$1 ORDER BY o1.helpful DESC LIMIT 5)));`


    pool.query(queryString, params)
      .then(results => callback(null, results.rows[0].json_build_object))
      .catch(err => callback(err));
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
    var queryString = `SELECT json_build_object('question', '${params[0]}', 'page', 1, 'count', 5, 'results', ARRAY((SELECT json_build_object('answer_id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported, 'photos', ARRAY((SELECT json_build_object('id', ap3.id,'url', ap3.url) FROM answers_photos ap3 WHERE answer_id=a2.id))) FROM answers a2 WHERE question_id=$1 ORDER BY a2.helpful DESC)));`
    pool.query(queryString, params)
    .then(results => callback(null, results.rows[0].json_build_object))
    .catch(err => callback(err));
  },

  postAnswer: (params, callback) => {
    var queryString;
    //the params have to come in as an object, but have to become an array to work with postgres
    //it's possible that an answerer would post multiple photos - how are nultiple urls managed?
  if (params.photos.length > 0) {
    var urls = params.photos; //I will have to iterate through this - I can do it in js or postgres - js is easier
    delete params.photos;
  }
  var params = Object.values(params); //post params are objects with keys and values
    console.log('urls in  model index', urls)

    console.log('params in  model index', params)
  //if no urls
  //if one url
  //if multiple urls
  if (!urls) {
    queryString = "INSERT INTO answers (body, answerer_name, answerer_email, question_id) VALUES ($1, $2, $3, $4);";
    pool.query(queryString, params)
    .then(results => callback(null, results.rows[0].json_build_object))
    .catch(err => callback(err));
  } else if (urls.length === 1) {
    queryString = "INSERT INTO answers (body, answerer_name, answerer_email, question_id) VALUES ($1, $2, $3, $4)RETURNING id;";

    pool.query(queryString, params)
    .then(results => {
      params = [results.rows[0].id];
      params.push(urls[0]);
      queryString = "INSERT INTO answers_photos (answer_id, url) VALUES ($1, $2);"

      pool.query(queryString, params)
      .then(results => console.log(results))
      .catch(err => console.log(err));
    })
    .then(results => callback(null, results))
    .catch(err => callback(err));
  } else {
    queryString = "INSERT INTO answers (body, answerer_name, answerer_email, question_id) VALUES ($1, $2, $3, $4)RETURNING id;";
    pool.query(queryString, params)
    .then(results => {

      urls.forEach((currentUrl) => {
        params = [results.rows[0].id];
        params.push(currentUrl);
        queryString = "INSERT INTO answers_photos (answer_id, url) VALUES ($1, $2);"
        pool.query(queryString, params)
        .then(results => console.log(results))
        .catch(err => console.log(err));
      })
    })
    .then(results => callback(null, results))
    .catch(err => callback(err));
  }
    // var queryString = "INSERT INTO answers (body, answerer_name, answerer_email, question_id) VALUES ($1, $2, $3, $4) RETURNING id;"; //edit for adding photos
    // pool.query(queryString, params, (err, results) => {
    //   if (err) {
    //     callback(err.code, err);
    //   } else {
    //     if (urls) {
    //       params = [results.rows[0].id];
    //       queryString = "INSERT INTO answers_photos (answer_id, url) VALUES ($1, $2) RETURNING id;"

    //       if (urls.length === 1) {

    //       }
    //     } else {

    //       console.log('results', results.rows[0].id); //multiple queries to get answer_id?
    //       callback(null, results);
    //     }
    //   }
    // });
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
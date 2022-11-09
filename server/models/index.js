const express = require('express');
const pool = require('../database/db.js');
const db = require('../database/db.js');

//page #/offset/count
//empty array vs null for questions answers photos

module.exports = {

  getAllQuestions: (params, callback) => {
    params = [params.product_id];
    var queryString = `
      SELECT json_build_object(
        'product_id', '${params[0]}',
        'results', ARRAY((
          SELECT json_build_object(
            'question_id', o1.id,
            'question_body', o1.body,
            'question_date', o1.date_written,
            'asker_name', o1.asker_name,
            'question_helpfulness', o1.helpful,
            'reported', o1.reported,
            'answers', (
              SELECT json_object_agg(
                a2.id, (
                  SELECT json_build_object(
                    'id', a2.id,
                    'body', a2.body,
                    'date', a2.date_written,
                    'answerer_name', a2.answerer_name,
                    'helpfulness', a2.helpful,
                    'reported', a2.reported,
                    'photos', ARRAY((
                      SELECT (ap3.url) FROM answers_photos ap3 WHERE answer_id=a2.id
                    ))
                  )
                )
              ) FROM answers a2 WHERE question_id=o1.id
            )
          ) FROM questions o1 WHERE product_id=$1 ORDER BY o1.helpful DESC
        ))
      );`

    pool.query(queryString, params)
      .then(results => callback(null, results.rows[0].json_build_object))
      .catch(err => callback(err));
  },

  postQuestion: (params, callback) => {
    params = Object.values(params);
    var queryString = "INSERT INTO questions (body, asker_name, asker_email, product_id) VALUES ($1, $2, $3, $4)";

    pool.query(queryString, params)
    .then(results => callback(null, results.rows[0]))
    .catch(err => callback(err));
  },

  getAnswers: (params, callback) => { //need to add page and count and defaults
    var queryString = `
      SELECT json_build_object(
        'question', '${params[0]}',
        'page', 1,
        'count', 5,
        'results', ARRAY((
          SELECT json_build_object(
            'answer_id', a2.id,
            'body', a2.body,
            'date', a2.date_written,
            'answerer_name', a2.answerer_name,
            'helpfulness', a2.helpful,
            'reported', a2.reported,
            'photos', ARRAY((
              SELECT json_build_object(
                'id', ap3.id,
                'url', ap3.url
              ) FROM answers_photos ap3 WHERE answer_id=a2.id
            ))
          ) FROM answers a2 WHERE question_id=$1 ORDER BY a2.helpful DESC
        ))
      );`

    pool.query(queryString, params)
      .then(results => callback(null, results.rows[0].json_build_object))
      .catch(err => callback(err));
  },

  postAnswer: (params, callback) => {
    var queryString;
    //the params have to come in as an object, but have to become an array to work with postgres
    //it's possible that an answerer would post multiple photos - how are nultiple urls managed?
  if (params.photos.length > 0) {
    var urls = params.photos;
    delete params.photos;
  }
  var params = Object.values(params); //post params are objects with keys and values
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
  },
  putHelpfulQuestion: (params, callback) => {
    var queryString = "UPDATE questions\
      SET helpful = helpful + 1\
      WHERE id=$1";

  pool.query(queryString, [params])
    .then(results => callback(null, results))
    .catch(err => callback(err));
  },
  reportQuestion: (params, callback) => {
    var queryString = "UPDATE questions\
      SET reported = true\
      WHERE id=$1";
    pool.query(queryString, [params])
      .then(results => callback(null, results))
      .catch(err => callback(err));
  },
  putHelpfulAnswer: (params, callback) => {
    var queryString = `
    UPDATE answers SET helpful = helpful + 1
      WHERE id=$1;`;
    pool.query(queryString, [params])
      .then(results => callback(null, results))
      .catch(err => callback(err));
  },
  reportAnswer: (params, callback) => {
    var queryString = `
      UPDATE answers SET reported = true WHERE id=$1;`;
    pool.query(queryString, [params])
      .then(results => callback(null, results))
      .catch(err => callback(err));
  }
}
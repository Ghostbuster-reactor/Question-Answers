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
    // console.log(params);
    if (incomingProductID !== params.product_id) { //check if same productID
      incomingProductID = params.product_id;
    } else {
      sameProduct = true;
      if (page.count && incomingLimit === page.count) {
        sameCount = true;
      }
    }  //work on defaults - of there is no page, offset by count + count upon repeat request
    // //if there is a page number and
    // //the product has already been called
    // //and the count is the same
    // //offset by the current count plus the count
    // //otherwise
    // //reset to offset 1 or 0;
    // if (params.page && sameProduct && sameCount) { //if there is a page count and
    //   incomingPageOffset = params.page;
    // } else if

    // if (sameProduct) {

    // }
    // if (params.page) {
    // } else {
    //   incomingPageOffset = 1;
    // }

    // if (params.count) {

    // } else {
    //   incomingLimit = 5;
    // }

    var parameterArray = [];
    parameterArray.push(incomingProductID);
    parameterArray.push(incomingPageOffset);
    parameterArray.push(incomingLimit);

    var queryString = "SELECT * from questions WHERE product_id=$1 OFFSET $2 LIMIT $3"; //I am going to have to work on this!! My objects need joins and better key names
    pool.query(queryString, parameterArray, (err, results) => {
      if (err) {
        callback(err.code);
      } else {

        callback(null, results.rows);
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

  getAnswers: (params, callback) => {
    console.log(params);
  var queryString = "SELECT * from answers WHERE question_id=$1 OFFSET 1 LIMIT 5"; //I am going to have to work on this!! My objects need joins and better key names
  pool.query(queryString, params, (err, results) => {
    if (err) {
      callback(err.code);
    } else {

      callback(null, results.rows);
    }
  });
},





}
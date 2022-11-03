require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const pool = require('./database/db.js');
const router = require('./routes.js');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/', router); //for requests


// const path = require('path');
// app.use(express.static(path.join(__dirname, '../client/dist'))); //for when client is cloned

app.listen(port, console.log(`Listening on port: ${port}`));
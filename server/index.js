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
app.get("/loaderio-f313d3e6de0e0fa32e593d5fc6b70cb6", (req, res) =>
res.send("loaderio-f313d3e6de0e0fa32e593d5fc6b70cb6"))

// const path = require('path');
// app.use(express.static(path.join(__dirname, '../client/dist'))); //for when client is cloned

app.listen(port, console.log(`Listening on port: ${port}`));
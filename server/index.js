require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const pool = require('./database/db.js');
// const path = require('path');
// const router = require('./routes.js');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

// app.use(express.static(path.join(__dirname, '../client/dist'))); //for when client is cloned

app.get('/', (req, res) => {
  pool.query('SELECT * from test', (err, result) => {
    if (err) throw err;
    res.status(200);
    res.send(result.rows);
  })
})

app.listen(port, console.log(`Listening on port: ${port}`));
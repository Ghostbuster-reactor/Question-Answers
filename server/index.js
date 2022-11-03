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
// app.post('/', (req, res) => {
//   pool.query("INSERT INTO testing (s_id, username) VALUES('12345', 'beetlejuice2')", (err, result) => {
//     if (err) throw err;
//     res.status(200);
//     res.send(result.rows);
//   })
// })

app.get('/', (req, res) => {
  console.log('GET REQUEST');
  pool.query('SELECT * from questions', (err, result) => {
    if (err) throw err;
    res.status(200);
    res.send(result.rows);
  })
})

app.listen(port, console.log(`Listening on port: ${port}`));
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes.js');
const pool = require('./Database')
// require('dotenv').config();

const app = express();
const port = 1299;

app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express());
app.get('/', (req, res) => {
  pool.query('SELECT * from test', (err, result) => {
    if (err) throw err;
    res.status(200);
    res.send(result.rows);
  })
})

app.listen(port, console.log(`Listening on port: ${port}`));
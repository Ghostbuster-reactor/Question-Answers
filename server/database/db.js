require("dotenv").config();
const { Pool } = require('pg');
const Promise = require("bluebird");
// console.log('name', process.env.DB_NAME)

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  max: 20,
  database: process.env.DB_NAME,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000, //this was 2000
});
//make username?

const db = Promise.promisifyAll(pool, { multiArgs: true });

// db.getAllQuestions = // db.connectAsync() // this connects and creates the tables
//   .then(() => console.log(`Connected to PostGresql in database, on ${process.env.PORT}`))
//   .catch((err) => console.log(err));

  //might need this later to manage clients
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('error in database', err.stack)
//   }
//   client.query('SELECT NOW()', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log('result rows in database', result.rows)
//   })
// })

module.exports = pool;
module.exports = db;

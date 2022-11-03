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

db.connectAsync() // this connects and creates the tables
  .then(() => console.log(`Connected to PostGresql in database, on ${process.env.PORT}`))
  .then(() => {

    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY, product_id INTEGER, body VARCHAR(255), date_written INTEGER, asker_name VARCHAR, asker_email VARCHAR(50), reported BOOLEAN, helpful INTEGER)"
    ); //this creates questions table


    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS answers (id SERIAL PRIMARY KEY, question_id INTEGER, body VARCHAR(255), date_written INTEGER, answerer_name VARCHAR, answerer_email VARCHAR(50), reported BOOLEAN, helpful INTEGER, FOREIGN KEY (question_id) REFERENCES questions(id))"
    ); //this creates answers table need foreign key

    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS answers_photos (id SERIAL PRIMARY KEY, answer_id INTEGER, url VARCHAR, FOREIGN KEY (answer_id) REFERENCES answers (id))"
    ); //this creates answers table need foreign key
  })
  .catch((err) => console.log(err));

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
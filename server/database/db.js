require("dotenv").config();
const { Pool } = require('pg');
const Promise = require("bluebird");
// console.log('name', process.env.DB_NAME)

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  // port: process.env.PORT,

  max: 20,
  database: 'test',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000, //this was 2000
});
//make username?

const db = Promise.promisifyAll(pool, { multiArgs: true });

db.connectAsync() // this only connects and creates the responses table
  .then(() => console.log(`Connected to PostGresql in database, on ${process.env.PORT}`))
  .then(() => {
    // console.log('db.threadId', db.threadId);
    // Expand this table definition as needed:

    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS testing (id SERIAL, s_id VARCHAR(50) NOT NULL UNIQUE, username VARCHAR(35) NOT NULL)"
    ) //this creates test table
  })
  .catch((err) => console.log(err));

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

// ;(async function() { //similar to above
//   const client = await pool.connect()
//   await client.query('SELECT NOW()')
//   client.release()
// })();

// pool.end(() => {
//   console.log('pool has ended')
// })

module.exports = pool;
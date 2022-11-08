require("dotenv").config();
const { Pool } = require('pg');
const Promise = require("bluebird");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  max: 20,
  database: process.env.DB_NAME,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000, //this was 2000
});


const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = pool;
module.exports = db;

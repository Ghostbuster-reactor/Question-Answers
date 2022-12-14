require("dotenv").config();
const { Pool } = require('pg');
const Promise = require("bluebird");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  // max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000, //this was 2000
});


const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = pool;
module.exports = db;

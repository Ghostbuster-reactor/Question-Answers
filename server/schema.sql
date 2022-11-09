CREATE DATABASE qanda IF NOT EXISTS;
\c qanda;

-- Use this command if you need to make complete revisions to your database
-- DROP DATABASE qanda IF EXISTS;


-- Use this command if you need to make any revisions to your tables
-- DROP TABLE IF EXISTS answers_photos, answers, questions;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  body VARCHAR(255),
  date_written BIGINT,
  asker_name VARCHAR,
  asker_email VARCHAR(50),
  reported BOOLEAN default false,
  helpful INTEGER default 0);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  body VARCHAR(255),
  date_written BIGINT,
  answerer_name VARCHAR,
  answerer_email VARCHAR(50),
  reported BOOLEAN default false,
  helpful INTEGER default 0,
);

CREATE TABLE IF NOT EXISTS answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers (id),
  url VARCHAR,
);

CREATE INDEX idx_product_id ON questions (product_id);
CREATE INDEX idx_question_id ON answers (question_id);
CREATE INDEX idx_answer_id ON answers_photos (answer_id);

/*  Execute this file from the command line by typing:
 *    psql -d qanda -a -f schema.sql
 *  to create the database and the tables.
 log in command for another terminal window is
 psql -d qanda
 */


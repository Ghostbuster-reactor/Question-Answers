-- CREATE DATABASE qanda;
-- DROP DATABASE qanda IF EXISTS;


\c qanda;
-- Use this command if you need to make any revisions to your tables
-- DROP TABLE IF EXISTS answers_photos, answers, questions;

-- //can include compression type
CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY, product_id INTEGER, body VARCHAR(255), date_written BIGINT, asker_name VARCHAR, asker_email VARCHAR(50), reported BOOLEAN default false, helpful INTEGER default 0);

CREATE TABLE IF NOT EXISTS answers (id SERIAL PRIMARY KEY, question_id INTEGER, body VARCHAR(255), date_written BIGINT, answerer_name VARCHAR, answerer_email VARCHAR(50), reported BOOLEAN default false, helpful INTEGER default 0, FOREIGN KEY (question_id) REFERENCES questions(id));


CREATE TABLE IF NOT EXISTS answers_photos (id SERIAL PRIMARY KEY, answer_id INTEGER, url VARCHAR, FOREIGN KEY (answer_id) REFERENCES answers (id)); -- url might need to be an array

/*  Execute this file from the command line by typing:
 *    psql -d qanda -a -f schema.sql
 *  to create the database and the tables.
 log in command for another terminal window is
 psql -d qanda
 */

-- //date_written TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

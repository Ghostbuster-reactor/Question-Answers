-- CREATE DATABASE qanda;

\c qanda;

-- //can include compression type
CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY, product_id INTEGER, body VARCHAR(255), date_written BIGINT, asker_name VARCHAR, asker_email VARCHAR(50), reported BOOLEAN, helpful INTEGER);


CREATE TABLE IF NOT EXISTS answers (id SERIAL PRIMARY KEY, question_id INTEGER, body VARCHAR(255), date_written BIGINT, answerer_name VARCHAR, answerer_email VARCHAR(50), reported BOOLEAN, helpful INTEGER, FOREIGN KEY (question_id) REFERENCES questions(id));


CREATE TABLE IF NOT EXISTS answers_photos (id SERIAL PRIMARY KEY, answer_id INTEGER, url VARCHAR, FOREIGN KEY (answer_id) REFERENCES answers (id));

/*  Execute this file from the command line by typing:
 *    psql -d qanda -a -f schema.sql
 *  to create the database and the tables.*/


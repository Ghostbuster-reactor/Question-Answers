-- CREATE DATABASE qanda;

\c qanda;

-- //can include compression type
CREATE TABLE IF NOT EXISTS questions (id SERIAL PRIMARY KEY, product_id INTEGER, body VARCHAR(255), date_written INTEGER, asker_name VARCHAR, asker_email VARCHAR(50), reported BOOLEAN, helpful INTEGER);


CREATE TABLE IF NOT EXISTS answers (id SERIAL PRIMARY KEY, question_id INTEGER, body VARCHAR(255), date_written INTEGER, answerer_name VARCHAR, answerer_email VARCHAR(50), reported BOOLEAN, helpful INTEGER, FOREIGN KEY (question_id) REFERENCES questions(id));


CREATE TABLE IF NOT EXISTS answers_photos (id SERIAL PRIMARY KEY, answer_id INTEGER, url VARCHAR, FOREIGN KEY (answer_id) REFERENCES answers (id));

-- CREATE TABLE users (
--   id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
--   username VARCHAR(255) NOT NULL
--   /* Describe your table here.*/
-- );

-- -- CREATE TABLE rooms (
-- --   id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
-- --   roomname VARCHAR(255) NOT NULL
-- --   -- message INTEGER(11),
-- --   -- FOREIGN KEY (message) REFERENCES messages(id)
-- --   /* Describe your table here.*/
-- -- );

-- CREATE TABLE messages (
--   id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
--   text VARCHAR(255) NOT NULL,
--   userid INTEGER(11),
--   roomname VARCHAR(255)
--   /* Describe your table here.*/
-- );

-- /* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


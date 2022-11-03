CREATE DATABASE chat;

USE chat;

COPY CODE HERE


CREATE TABLE users (
  id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL
  /* Describe your table here.*/
);

-- CREATE TABLE rooms (
--   id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
--   roomname VARCHAR(255) NOT NULL
--   -- message INTEGER(11),
--   -- FOREIGN KEY (message) REFERENCES messages(id)
--   /* Describe your table here.*/
-- );

CREATE TABLE messages (
  id INTEGER(11) PRIMARY KEY AUTO_INCREMENT,
  text VARCHAR(255) NOT NULL,
  userid INTEGER(11),
  roomname VARCHAR(255)
  /* Describe your table here.*/
);

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


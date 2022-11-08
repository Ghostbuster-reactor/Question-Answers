\c qanda;
--copying data to questions table, formatting the enoch column, dates, and default to timestamps, and setting the NEXT val
COPY questions from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/questions.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE questions ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);

ALTER TABLE questions
ALTER COLUMN date_written SET DEFAULT CURRENT_TIMESTAMP;

SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'id'), MAX(id)) FROM questions;


--copying data to answers table, formatting the enoch column, dates, and default to timestamps, and setting the NEXT val
COPY answers from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/answers.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE answers ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);

ALTER TABLE answers
ALTER COLUMN date_written SET DEFAULT CURRENT_TIMESTAMP;

SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'id'), MAX(id)) FROM answers;



--copying data to answers_photos table, and setting the NEXT val
COPY answers_photos from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT pg_catalog.setval(pg_get_serial_sequence('answers_photos', 'id'), MAX(id)) FROM answers_photos;


/*  Execute this file from the command line by typing:
 *    psql -d qanda -a -f ETL.sql
 *  to fill the tables in with the data from the csv files.
 *  You can comment out the other two commands to run one at a time,
 *  starting with questions.*/


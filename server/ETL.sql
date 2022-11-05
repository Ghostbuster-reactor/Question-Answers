\c qanda;

COPY questions from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/questions.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE questions ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);

ALTER TABLE questions
ALTER COLUMN date_written SET DEFAULT CURRENT_TIMESTAMP;

ALTER SEQUENCE questions_id_seq restart with 3518964;

COPY answers from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/answers.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE answers ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);

ALTER TABLE answers
ALTER COLUMN date_written SET DEFAULT CURRENT_TIMESTAMP;

ALTER SEQUENCE answers_id_seq restart with 6879307;

COPY answers_photos from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;

ALTER SEQUENCE answers_photos_id_seq restart with 2063759;

/*  Execute this file from the command line by typing:
 *    psql -d qanda -a -f ETL.sql
 *  to fill the tables in with the data from the csv files.
 *  You can comment out the other two commands to run one at a time,
 ALTER SEQUENCE questions_id_seq restart with 3518964; (for non-repeating - maybe find a way to make it auto-increment at the biggest number?

 *  starting with questions.*/


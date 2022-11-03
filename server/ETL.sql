\c qanda;

-- COPY questions from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/questions.csv' DELIMITER ',' CSV HEADER;

-- COPY answers from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/answers.csv' DELIMITER ',' CSV HEADER;

COPY answers_photos from '/Users/tthornberryclass/HackReactorSEI/CSV-SDC/answers_photos.csv' DELIMITER ',' CSV HEADER;

/*  Execute this file from the command line by typing:
 *    psql -d qanda -a -f ETL.sql
 *  to fill the tables in with the data from the csv files.
 *  You can comment out the other two commands to run one at a time,
 *  starting with questions.*/
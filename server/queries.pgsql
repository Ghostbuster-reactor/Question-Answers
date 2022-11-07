SELECT json_build_object(
  'product_id', '40380',
  'results',
    (SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830)
);

-- this gets the questions, which I will have to arrange to be by qty count & offset to be 'perfect'
SELECT o1.product_id, json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported) FROM questions o1 WHERE product_id=40830 ORDER BY o1.helpful DESC;


-- SELECT ARRAY_AGG (product_id) questions FROM questions WHERE product_id=40830;
SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830;

-- how do I get the array of answers for the questions? select array of question numbers first and THEN for each one, get response?

-- SELECT json_build_object(
--   'product_id', '40380',
--     (SELECT questions,
--     ARRAY_AGG (id) AS results from field questions
--     left outer join
--     (
--       SELECT o1.product_id, json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported) FROM questions o1 WHERE product_id=40830 ORDER BY o1.helpful DESC
--     ) o

-- ));
'question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported'

SELECT json_build_object(
  'product_id', '40380',
  'results',
    (SELECT json_object_agg(
      id, (select json_build_object(
        'question_id', id,
        'question_body', body,
        'question_date', date_written,
        'asker_name', asker_name,
        'question_helpfulness', helpful,
        'reported', reported
      ) FROM questions WHERE product_id=40380
    ) FROM questions WHERE product_id=40380
    )
);
-- this returns an array of question id's. I will be adding the limits and offsets to this eventually;
SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830;

SELECT json_object_agg( question_id, (SELECT json_build_object( 'question_id', id) FROM questions where product_id=40830)) AS results;

SELECT json_build_object(
  'product_id', '40380',
  'results',
    (SELECT json_object_agg(json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported) FROM questions o1 WHERE product_id=40830 ORDER BY o1.helpful DESC))
);

SELECT json_build_object(
  'product_id', '40380',
  'results',
    (SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830)
);
select * from answers_photos where answer_id=6879111;

SELECT json_build_object(
  'product_id', '40380',
  'results',
    (SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=6879111)
);

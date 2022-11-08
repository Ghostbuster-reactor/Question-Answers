--this gives me an array of the question_id's for that product
SELECT json_build_object(
  'product_id', '40380',
  'results',
    (SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830)
);

-- this gets the questions objects, which I will have to arrange to be by qty count & offset to be 'perfect'
SELECT json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported) FROM questions o1 WHERE product_id=40830 ORDER BY o1.helpful DESC;


-- SELECT ARRAY_AGG (product_id) questions FROM questions WHERE product_id=40830;
SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830;

-- this returns an array of question id's. I will be adding the limits and offsets to this eventually;
SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830;

SELECT json_build_object( 'question_id', id) FROM questions where product_id=40830;

-- this retuns the beginnings of what I want --template literals?,
SELECT json_build_object('product_id', '${params[0]}', 'results', ARRAY((SELECT json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported, 'answers', (SELECT json_object_agg(a2.id, (SELECT json_build_object('id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported)))FROM answers a2 WHERE question_id=o1.id)) FROM questions o1 WHERE product_id=915819 ORDER BY o1.helpful DESC LIMIT 5)));


SELECT json_build_object('product_id', '${params[0]}', 'results', ARRAY((SELECT json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported, 'answers', (SELECT json_object_agg(a2.id, (SELECT json_build_object('id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported, 'photos',
    (CASE WHEN count (url) = 0 THEN ARRAY[]::json[] ELSE SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=a2.id))))FROM answers a2 WHERE question_id=o1.id)) FROM questions o1 WHERE product_id=$1 ORDER BY o1.helpful DESC LIMIT 5)));

    select answers_photos.url, case when count(url)=0 THEN ARRAY[]::json[] ELSE ARRAY_AGG (url) end photos2 FROM answers_photos WHERE answer_id=6297785 group by url;


-- SELECT answer_id FROM answers_photos WHERE url='https://images.unsplash.com/photo-1554774853-d50f9c681ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80';
SELECT json_build_object(
'photos', (CASE WHEN count(.url) = 0 THEN ARRAY[]::json[] ELSE SELECT ARRAY_AGG (a2.url)) FROM answers_photos WHERE answer_id=a2.id)
test 328949 for no photos
-- CASE WHEN ... THEN ... ELSE ... END
SELECT json_build_object(
  'photos',
    (SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=6300889)
);

(SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830)
--how do I make an object have the keys of the answer numbers? --how do I sort them by
--this returns answers
SELECT json_build_object(
  'answers',
    (
      SELECT json_object_agg(
        a2.id,
      (SELECT json_build_object('id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported)))FROM answers a2 WHERE question_id=168280)
);
--  GROUP BY a2.id ORDER BY a2.helpful DESC

    var queryString = "SELECT json_build_object('product_id', '40380', 'results', ARRAY((SELECT json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported, 'answers', (SELECT json_object_agg(a2.id, (SELECT json_build_object('id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported)))FROM answers a2 WHERE question_id=168280)) FROM questions o1 WHERE product_id=915189 ORDER BY o1.helpful DESC)));"

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
-- 'question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported'
SELECT json_build_object('question', '168280', 'page', 1, 'count', 5, 'results',
ARRAY((SELECT json_build_object(
  'answer_id', a2.id, 'body', a2.body, 'date', a2.date_written, 'answerer_name', a2.answerer_name, 'helpfulness', a2.helpful, 'reported', a2.reported,
  'photos', (SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=a2.id)) FROM answers a2 WHERE question_id=168280 ORDER BY a2.helpful DESC)));


-- SELECT json_build_object(
--   'product_id', '40380',
--   'results',
--     (SELECT json_object_agg(
--       id, (select json_build_object(
--         'question_id', id,
--         'question_body', body,
--         'question_date', date_written,
--         'asker_name', asker_name,
--         'question_helpfulness', helpful,
--         'reported', reported
--       ) FROM questions WHERE product_id=40380
--     ) FROM questions WHERE product_id=40380
--     )
-- );

-- SELECT json_build_object(
--   'product_id', '40380',
--   'results',
--     (SELECT json_object_agg(json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported) FROM questions o1 WHERE product_id=40830 ORDER BY o1.helpful DESC))
-- );

-- SELECT json_build_object(
--   'product_id', '40380',
--   'results',
--     (SELECT ARRAY_AGG (id) FROM questions WHERE product_id=40830)
-- );
-- select * from answers_photos where answer_id=6879111;

SELECT json_build_object(
  ('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported) FROM questions o1 WHERE product_id=40830 ORDER BY o1.helpful DESC
  'product_id', '40380',
  'photos',
    (SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=6879111)
);

SELECT json_build_object(
  'product_id', '40380',
  'results',
  ARRAY(
    (SELECT json_build_object('question_id', o1.id, 'question_body', o1.body, 'question_date', o1.date_written, 'asker_name', o1.asker_name, 'question_helpfulness', o1.helpful, 'reported', o1.reported) FROM questions o1 WHERE product_id=40830 ORDER BY o1.helpful DESC)
  )
);
SELECT ARRAY_AGG (url) FROM answers_photos WHERE answer_id=a2.id


select url,
case when (select count(*) from answers_photos where answer_id=6297785)=0 from answers_photos where answer_id=6297785 returning false;
--no photos 328948

select answers_photos.answer_id, case when count(o)=0 then array[]::VARCHAR[] ELSE ARRAY_AGG(o.photos) end as photos from answers a2 left outer join (SELECT o3.url as photos from answers_photos o3) o
on a2.id=answers_photos.answer_id, from answers_photos o,
where answer_id=6297785
group by o.answer_id;

begin select url from answers_photos where answer_id=6297785; if not found THEN ARRAY[]::json[]; end if;
if select url from answers_photos where answer_id=6297785; if not found THEN ARRAY[]::json[]; end if;




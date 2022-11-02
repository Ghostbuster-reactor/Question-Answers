const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbName = 'test';

const uri = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(uri, {useNewUrlParser: true});

/**making new schema */
const questionsSchema = new Schema({
  question_id: INT PRIMARY-KEY AUTO-INCREMENT,
  product_id: INT,
  question_body: VARCHAR,
  question_date: DATE,
  asker_name: VARCHAR,
  question_helpfulness: INT,
  reported: BOOLEAN,
});

const answersSchema = new Schema({
  id: INT PRIMARY-KEY AUTO-INCREMENT,
  body: VARCHAR,
  date: DATE,
  answerer_name: VARCHAR,
  helpfulness: INT,
  reported: BOOLEAN,
  question_id: INT FOREIGN-KEY,
  photos: []
});

const Questions = mongoose.model('Questions', questionsSchema);

const Answers = mongoose.model('Answers', answersSchema);

//GET
// var findAllWords = (input) => {
//   var object = {input} || {};
//   return Words.find(input); //make sure there is an empty object here!
// };
// //POST
// //but what about when someone tries to put in a word that already exists?
// var createWord = (input) => {
//   return Words.create(input);
// };

// //PUT - this SHOULD be able to take an ID and update the word, the definition, or BOTH YES IT CAN! woo!
// var updateWord = (filter, update) => {
//   return Words.findOneAndUpdate(filter, update);
// };
// //DELETE
// var deleteWord = (input) => {
//   return Words.findOneAndDelete(input);
// };

// // module.exports.db = db;
// module.exports.createWord = createWord;
// module.exports.findAllWords = findAllWords;
// module.exports.updateWord = updateWord;
// module.exports.deleteWord = deleteWord;

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

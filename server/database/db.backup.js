const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dbName = 'test';

const uri = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(uri, {useNewUrlParser: true});

/**making new schema */
const questionsSchema = new Schema({
  id: INT PRIMARY-KEY AUTO-INCREMENT,
  product_id: INT,
  body: VARCHAR(500),
  date_written: INT,
  asker_name: VARCHAR(50),
  asker_email: VARCHAR(100),
  reported: BOOLEAN,
  helpful: INT
});
//id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
const answersSchema = new Schema({
  id: INT PRIMARY-KEY AUTO-INCREMENT,
  question_id: INT FOREIGN-KEY,
  body: VARCHAR(500),
  date_written: DATE,
  answerer_name: VARCHAR(50),
  answerer_email: VARCHAR(100),
  reported: BOOLEAN,
  helpful: INT,
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

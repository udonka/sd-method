var mongoose = require('mongoose');
var _us = require('underscore');
var url = 'mongodb://localhost/sd-method';

var db_obj = module.exports = {};

mongoose.Promise = global.Promise;
  
mongoose.connect(url);

// 接続イベントを利用してログ出力
mongoose.connection.on('connected', function () {
  console.log('mongoose URI locates ' + url);
});


var UserSchema = require("./user.js");
var QuestionSetSchema = require("./question_set.js");
var QuestionnaireSchema = require("./questionnaire.js");
var QuestionnaireAnswerSchema = require("./questionnaire_answer.js");

mongoose.model("User",UserSchema);
mongoose.model("QuestionSet",QuestionSetSchema);
mongoose.model("Questionnaire",QuestionnaireSchema);
mongoose.model("QuestionnaireAnswer",QuestionnaireAnswerSchema);


db_obj.db_loaded_promise = Promise.resolve("loaded DB");


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require("underscore");

var QuestionnaireSchema = module.exports = new Schema({
  title:String,
  question_set: { type:Schema.Types.ObjectId, ref:"QuestionSet" }
});



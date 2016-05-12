var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require("underscore");

var ChoicesSchema = new Schema({
  left:String,
  right:String,
  length:Number //本当は、choises:[String]とかつけたいけど
},{_id:false});

var QuestionSchema = new Schema({
  title:String,
  choices:ChoicesSchema
});

var QuestionSetSchema = module.exports = new Schema({
  title:String,
  questions:[QuestionSchema]
});


module.exports.QuestionSchema = QuestionSchema;


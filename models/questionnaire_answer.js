var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require("underscore");
var QuestionSchema = require("./question_set").QuestionSchema;

var AnswerSchema = new Schema({
  value:Number, //数字とは限らないかも。。
  question: QuestionSchema // sub schemaとして object id ついてるはず

},{_id:false});

var QuestionaireAnswerSchema = module.exports = new Schema({
  questionnaire:{ type: Schema.Types.ObjectId, ref: 'Questionnaire' },
  answerer:{ type: Schema.Types.ObjectId, ref: 'User' },
  answers:[AnswerSchema]
});

QuestionaireAnswerSchema.methods.isFilledOut = function(){
  var filledout = _.reduce(this.answers, function(memo,answer){
    console.log("answer");
    console.log(answer);
    console.log("memo");
    console.log(memo);
    return memo & (answer.value !== null);
  },true);

  console.log(filledout);


  return filledout;
};



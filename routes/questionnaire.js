var express = require('express');
var questionnaire_router = module.exports = express.Router();

var mongoose = require("mongoose");
var Questionnaire = mongoose.model("Questionnaire");
var QuestionnaireAnswer = mongoose.model("QuestionnaireAnswer");

var _ = require("underscore");

var co = require("co");


questionnaire_router.get("/",(req,res,next)=>{
  co(function*(){
    var questionnaire = yield req.questionnaire.populate("question_set").execPopulate();

    console.log(questionnaire);
    res.render("survey/questionnaire", {questionnaire});
  }).catch((err)=>{
    next(err);
  });
});



questionnaire_router.get("/answers", (req,res,next)=>{
  co(function*(){
    var answers = yield QuestionnaireAnswer.find({questionnaire:req.questionnaire._id}).populate("answerer").exec();

    console.log(answers);

    res.render("survey/questionnaire_answers.jade", {
      questionnaire_id:req.questionnaire._id,
      answers
    });

  }).catch((err)=>{
    next(err);
  });
});


function make_answers(questions,body){
  var answers = _.map(questions,(question)=>{
    var answer = body[question._id];
    if(answer >= 0){
      return {value:answer, question:question};
    }
    else{
      return {value:null, question:question};
    }
  });
  return answers;
}

questionnaire_router.post("/answers",(req,res,next)=>{
  co(function*(){
    if(!req.user){
      req.flash("error","ログインしてください");
      res.redirect("/");
      
      return;
    }
    var body = req.body;
    console.log(body);

    var questionnaire = req.questionnaire;
    //questionnaireと bodyをくらべる
    
    console.log("questionnaire.question_set.questions");
    console.log(questionnaire.question_set);
    console.log(questionnaire.question_set.questions);
    var answers = make_answers(questionnaire.question_set.questions, body);


    console.log(answers);


    var newQuestAnswer = new QuestionnaireAnswer({
        questionnaire, //これもidにしてくれるみたい
        answerer:req.user, //.id でもよい。うまいことやってくれる
        answers
    });


    var result = yield newQuestAnswer.save();

    res.redirect("/questionnaires/"+ questionnaire._id +"/answers/"+ newQuestAnswer._id);

    /*
    if(empty_errors.length > 0){
      res.render("survey/questionnaire", {questionnaire, answers, empty_errors});
    }
    res.render("survey/questionnaire", {questionnaire, answers, empty_errors});
    */
  }).catch((err)=>{
    next(err);
  });
});

questionnaire_router.param("answer_id",(req,res,next,answer_id)=>{
  co(function*(){
    var quest_answer = yield QuestionnaireAnswer.findById(answer_id).exec();
    if(quest_answer){
      req.quest_answer = quest_answer;
      next();
    }
    else{
      next(new Error("answer is not found"));
    }

  }).catch((err)=>{
    next(err);
  });
});


questionnaire_router.get("/answers/:answer_id",(req,res,next)=>{
  co(function*(){
    console.log("questionnnarreraewfaewfawefaewfaewfawefawef");
    console.log(req.quest_answer.answers);
    var quest_answer = yield req.quest_answer.populate("answerer").execPopulate();

    var alert_message = "";
    if( !quest_answer.isFilledOut())
      alert_message = "回答できていない質問項目があります";

    res.render("survey/questionnaire_answer", {questionnaire:req.questionnaire, quest_answer, alert_message});

  }).catch((err)=>{
    next(err);
  });
});

questionnaire_router.put("/answers/:answer_id",(req,res,next)=>{
  co(function*(){
    var body = req.body;
    console.log(body);

    var questionnaire = req.questionnaire;
    //questionnaireと bodyをくらべる
    
    var answers = make_answers(questionnaire.question_set.questions, body);

    req.quest_answer.answers = answers;

    var result = req.quest_answer.save();

    req.flash("info","回答を編集しました");
    res.redirect("/questionnaires/"+ questionnaire._id +"/answers/"+ req.quest_answer._id);

  }).catch((err)=>{
    next(err);
  });
  
});



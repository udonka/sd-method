var express = require('express');

//mongoose
var mongoose = require("mongoose");
var QuestionSet = mongoose.model("QuestionSet");
var Questionnaire = mongoose.model("Questionnaire");
var QuestionnaireAnswer = mongoose.model("QuestionnaireAnswer");

var _ = require("underscore");
var co = require("co");

var questionnaires_router = module.exports =  express.Router();
var questionnaire_router = require("./questionnaire");


questionnaires_router.get("/",(req,res,next)=>{
  co(function*(){
    var questionnaires = yield Questionnaire.find().populate("question_set").exec();

    //res.render("contents/test", {data:questionnaires});
    res.render("survey/questionnaires", {questionnaires});
  }).catch((err)=>{
    next(err);
  });
});


questionnaires_router.get("/addnew/",(req,res,next)=>{
  res.render("survey/add_questionnaire");
});

questionnaires_router.post("/",(req,res,next)=>{
  co(function*(){
    var question_set_id = req.body.question_set_id;
    var kanji_list = req.body.kanji_list.split(",");

    var questionnaires = yield _.map(kanji_list, (kanji)=>{
      return new Questionnaire({title:kanji, question_set:question_set_id}).save();
    });

    req.flash("info", "質問の作成に成功しました。");
    res.redirect("/questionnaires");

  }).catch((err)=>{
    next(err);
  });
});


//???? ここじゃなくね
questionnaires_router.get("/mypage",(req,res,next)=>{
  //自分の回答が表示される
  //
  co(function*(){
    var myAnswers = yield QuestionnaireAnswer.find({answerer:req.user._id}).populate("answerer").exec();
    res.render("survey/questionnaire_answers.jade",{
      answers:myAnswers
    });
  }).catch((err)=>{
    next(err);
  });

});


questionnaires_router.param("questionnaire_id",function(req,res,next,questionnaire_id){
  co(function*(){
    console.log("param questionnaire !!!");
    var questionnaire = yield Questionnaire.findById(questionnaire_id).populate("question_set").exec();

    if(questionnaire){
      req.questionnaire = questionnaire;
      next();
    }
    else{
      next(new Error("questionnaire was not found"));
    }
  }).catch((err)=>{
    next(err);
  });
});


questionnaires_router.use("/:questionnaire_id" , questionnaire_router);

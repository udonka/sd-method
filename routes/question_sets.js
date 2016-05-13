var express = require('express');
var question_sets_router = module.exports = express.Router();

var mongoose = require("mongoose");
var QuestionSet = mongoose.model("QuestionSet");

var _ = require("underscore");
var co = require("co");


question_sets_router.get("/", (req,res,next)=>{
  co(function*(){
    var question_sets = yield QuestionSet.find().exec();
    res.render("survey/question_sets.jade", {question_sets});
    //res.render("contents/test", {data:question_sets});
    //
  }).catch((err)=>{
    next(err);

  });

});


question_sets_router.get("/addnew",(req,res,next)=>{
  res.render("survey/add_question_set");
});

var router_helper = require("../util/router_helper");

question_sets_router.post("/",(req,res,next)=>{
  co(function*(){
    var title = req.body.question_set_title;
    var body = req.body.question_set_body;

    var lines =  router_helper.convertLinesToArray(body);

    var question_set_array = _(lines).map((line)=>{
      var array = router_helper.stringToArray(line,/、/);

      return {title:array[0], choices:{left:array[1], right:array[2], length:5}};
    });

    var newQuestionSet = new QuestionSet({title,questions: question_set_array });
    var re = yield newQuestionSet.save();


    //type of res ???
    console.log("question set save response");
    console.log(re);

    res.render("test",{data:re});

  }).catch((err)=>{
    next(err);
  });
});


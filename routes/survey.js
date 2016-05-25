var express = require('express');
var survey_router = module.exports = express.Router();
var questionnaires_router = require("./questionnaires");
var question_sets_router = require("./question_sets");

//mongoose
var mongoose = require("mongoose");
var QuestionSet = mongoose.model("QuestionSet");
var Questionnaire = mongoose.model("Questionnaire");
var QuestionnaireAnswer = mongoose.model("QuestionnaireAnswer");

var _ = require("underscore");
var co = require("co");


survey_router.get("/",(req,res,next)=>{
   res.render("survey" );
});

survey_router.use("/questionnaires/", questionnaires_router);
survey_router.use("/question_sets/", question_sets_router );





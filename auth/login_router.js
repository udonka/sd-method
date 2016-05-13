var express = require('express');
var login_router = module.exports = express.Router({strict:"true"});

var passport = require("passport");

var mongoose = require("mongoose");
var User = mongoose.model("User");

var _ = require("underscore");

var co = require("co");


login_router.get("/",(req,res,next)=>{
  res.render("login.jade");
});


login_router.post("/", passport.authenticate('local',{
  failureRedirect: "/local",
  successRedirect: "/",
})); 


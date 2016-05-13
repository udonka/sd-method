var mongoose = require('mongoose');
var _ = require("underscore");
//var encrypt = require('../authentication/encrypt.js');

///////////////////////////////////////////////////////////////
//                        User Schema
///////////////////////////////////////////////////////////////

var UserSchema = module.exports = new mongoose.Schema({
  email        :String,
  password     :String
});





/*
UserSchema.methods.passwordIsCorrect = function(password){
  return encrypt.validPassword(password, this.userinfo.local.password);
};

UserSchema.methods.setPassword= function(password){
  this.userinfo.local.password = encrypt.generateHash(password);
};

*/



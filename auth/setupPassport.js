var passport = require("passport");

var mongoose = require("mongoose");
var User = mongoose.model("User");

var LocalStrategy = require("passport-local").Strategy;

var co = require("co");


// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email,password,done){

    co(function*(){
      var user = yield User.findOne({ email : email });
      if(!user){
        return done(null,false,{message: "Couldn't log-in."});
      }

      //if user found,
      done(null,user);


    }).catch(function(err){

      consolelog(done(err));

    });
  }));

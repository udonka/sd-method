var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var db = require("./models/database");


require("./auth/setupPassport");

var routes = require('./routes/index');
var survey_router = require('./routes/survey');
var login_router = require('./auth/login_router');

var session      = require('express-session');
var flash        = require('req-flash');
var passport     = require("passport");

var methodOverride = require('method-override');

var app = express({strict:true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.basedir = path.join(__dirname, 'views');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash({ locals: 'flash' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));


app.use(function(req,res,next){
  res.locals.url = req.protocol + '://' + req.get('host') + req.url;
  res.locals.originalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.locals.path = req.url;
  res.locals.originalPath = req.originalUrl;
  res.locals.user = req.user;

  next();
});




//app.use('/', routes);
app.use('/', survey_router);
app.use('/login', login_router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

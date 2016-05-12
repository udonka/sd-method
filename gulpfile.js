var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var bourbon= require("node-bourbon");
var neat = require("node-neat");
var print = require("gulp-print");
var notify = require("gulp-notify");

//var browser = require("browser-sync");
gulp.task("sass", function(){ 
  return gulp.src("./scss/*.scss")

    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>") //<-
    }))

    .pipe(sass({
      includePaths: neat.includePaths
    }).on('error', sass.logError)) 

    //.pipe(uglify())
    //
    .pipe(gulp.dest("./public/stylesheets/"));

});

gulp.task('watch',function(){
  gulp.watch("./scss/**/*.scss", ["sass"]);
  gulp.watch(['./public/stylesheets/*.css'], function(event){
    console.log("css changed");
  });

});


gulp.task("default", ["sass", "watch"]);


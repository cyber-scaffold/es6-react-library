/* eslint-disable no-undef */
const gulp = require("gulp");
const path = require("path");
const watch = require("gulp-watch");
const babel = require("gulp-babel");


function static_task(){
  const watch_pattern=path.resolve(__dirname,"./src/**/*.{css,png,jpg,jpeg,gif,svg,eot,svg,ttf,woff,woff2,json}");
  const watcher=watch(watch_pattern,{ignoreInitial:false},()=>{
    gulp
      .src(watch_pattern,{sourcemaps:true})
      .pipe(gulp.dest("dist"))
  });
  return watcher;
}

function bebel_task(){
  const watch_pattern=path.resolve(__dirname,"./src/**/*.{js,jsx}");
  const watcher=watch(watch_pattern,{ignoreInitial:false},()=>{
    gulp
      .src(watch_pattern,{sourcemaps:true})
      .pipe(babel())
      .pipe(gulp.dest("dist"));
  });
  return watcher;
}

exports.default=gulp.parallel(static_task,bebel_task);
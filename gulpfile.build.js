/* eslint-disable no-undef */
const gulp = require("gulp");
const path = require("path");
const babel = require("gulp-babel");

function static_task(){
  const watch_pattern=path.resolve(__dirname,"./src/**/*.{css,png,jpg,jpeg,gif,svg,eot,svg,ttf,woff,woff2,json}");
  return gulp
    .src(watch_pattern)
    .pipe(gulp.dest("dist"));
}

function bebel_task(){
  const watch_pattern=path.resolve(__dirname,"./src/**/*.{js,jsx}");
  return gulp
    .src(watch_pattern)
    .pipe(babel())
    .pipe(gulp.dest("dist"));
}

exports.default=gulp.parallel(bebel_task,static_task);
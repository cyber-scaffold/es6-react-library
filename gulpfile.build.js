/* eslint-disable no-undef */
const gulp = require("gulp");
const path = require("path");
const babel = require("gulp-babel");

function static_task(){
  const watch_pattern=path.resolve(__dirname,"./src/**/*.{png,jpg,jpeg,gif,svg}");
  const gulp_task=gulp.src(watch_pattern);
  gulp_task.pipe(gulp.dest("dist"));
  return gulp_task;
}

function bebel_task(){
  const watch_pattern=path.resolve(__dirname,"./src/**/*.{js,jsx}");
  const gulp_task=gulp.src(watch_pattern);
  gulp_task.pipe(babel());
  gulp_task.pipe(gulp.dest("dist"));
  return gulp_task;
}

exports.default=gulp.parallel(static_task,bebel_task);
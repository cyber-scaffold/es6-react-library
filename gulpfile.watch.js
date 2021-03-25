/* eslint-disable no-undef */
const gulp=require("gulp");
const path=require("path");
const watch=require("gulp-watch");
const babel=require("gulp-babel");

function static_task(){
  const watch_pattern=path.resolve(__dirname,"./src/**/*.{css,png,jpg,jpeg,gif,svg,eot,svg,ttf,woff,woff2,json}");
  const gulp_source=gulp.src(watch_pattern,{sourcemaps:true})
  gulp_source
    .pipe(watch(watch_pattern,{ignoreInitial:false}))
    .pipe(gulp.dest("dist"))
  return gulp_source;
}

function bebel_task(){
  const source_pattern=path.resolve(__dirname,"./src/**/*.{js,jsx}");
  const gulp_source=gulp.src(source_pattern,{sourcemaps:true});
  gulp_source
    .pipe(watch(source_pattern,{ignoreInitial:false}))
    .pipe(babel())
    .pipe(gulp.dest("dist"))
  return gulp_source;
}

exports.default=gulp.parallel(static_task,bebel_task);

console.log("watch task is runing");
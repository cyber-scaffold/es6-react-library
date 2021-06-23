/* eslint-disable no-undef */
const gulp=require("gulp");
const path=require("path");
const watch=require("gulp-watch");
const babel=require("gulp-babel");
const postcss = require("gulp-postcss");
const postcssModules=require("postcss-modules");
const pxtoviewport = require("postcss-px-to-viewport");
const postcss_scss=require("postcss-scss");

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
  const gulp_source=gulp.src(source_pattern,{sourcemaps:false});
  gulp_source
    .pipe(watch(source_pattern,{ignoreInitial:false}))
    .pipe(babel())
    .pipe(gulp.dest("dist"))
  return gulp_source;
}

function postcss_task(){
  const source_pattern=path.resolve(__dirname,"./src/**/*.scss");
  const gulp_source=gulp.src(source_pattern,{sourcemaps:false});
  gulp_source
    .pipe(watch(source_pattern,{ignoreInitial:false}))
    .pipe(postcss([
      postcssModules({
        getJSON:()=>{},
        generateScopedName: "[name]__[local]___[hash:8]"
      }),
      pxtoviewport({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1624, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      })
    ],{
      parser:postcss_scss
    }))
    .pipe(gulp.dest("dist"))
  return gulp_source;
}

exports.default=gulp.series(gulp.parallel(static_task,bebel_task),postcss_task);

console.log("watch task is runing");
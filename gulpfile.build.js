/* eslint-disable no-undef */
const fs=require("fs");
const {promisify}=require("util");
const gulp = require("gulp");
const path = require("path");
const clean=require("gulp-clean");
const babel = require("gulp-babel");
const postcss = require("gulp-postcss");
const postcssModules=require("postcss-modules");
const pxtoviewport = require("postcss-px-to-viewport");
const postcss_scss=require("postcss-scss");

function clean_dist(){
  const pattern=path.resolve(__dirname,"./dist/");
  const gulp_source=gulp.src(pattern,{sourcemaps:true,allowEmpty:true});
  gulp_source.pipe(clean());
  return gulp_source;
}

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

function postcss_task(){
  const source_pattern=path.resolve(__dirname,"./src/**/*.scss");
  return gulp_source=gulp
    .src(source_pattern,{sourcemaps:false})
    .pipe(postcss([
      postcssModules({
        getJSON:async (cssFileName,json)=>{
          const src_dirpath=path.resolve(__dirname,"./src/");
          const dist_dirpath=path.resolve(__dirname,"./dist/");
          const dirname=path.dirname(cssFileName);
          const basename=path.basename(cssFileName);
          const finally_outdir_path=[path.join(dirname.replace(src_dirpath,dist_dirpath),basename),"json"].join(".");
          await promisify(fs.writeFile)(finally_outdir_path,JSON.stringify(json,null,"\t"));
        },
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
}

exports.default=gulp.series(clean_dist,gulp.parallel(static_task,bebel_task),postcss_task);

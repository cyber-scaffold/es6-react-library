/* eslint-disable no-undef */
const fs=require("fs");
const {promisify}=require("util");
const gulp=require("gulp");
const path=require("path");
const clean=require("gulp-clean");
const watch=require("gulp-watch");
const babel=require("gulp-babel");
const is_windows=require("is-windows");
const postcss = require("gulp-postcss");
const postcssModules=require("postcss-modules");
const postcss_scss=require("postcss-scss");

function clean_dist(){
  const pattern=path.resolve(__dirname,"./dist/");
  const gulp_source=gulp.src(pattern,{sourcemaps:true,allowEmpty:true});
  gulp_source.pipe(clean());
  return gulp_source;
}

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

function postcss_task(){
  const source_pattern=path.resolve(__dirname,"./src/**/*.scss");
  const gulp_source=gulp.src(source_pattern,{sourcemaps:false});
  gulp_source
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
      })
    ],{
      parser:postcss_scss
    }))
    .pipe(gulp.dest("dist"))
  return gulp_source;
}

const watcher=gulp.watch(path.resolve(__dirname,"./src/**/*.scss"));
is_windows()?watcher.on("raw",gulp.series(bebel_task,postcss_task)):void(0);
watcher.on("add",gulp.series(bebel_task,postcss_task));
watcher.on("change",gulp.series(bebel_task,postcss_task));
watcher.on("unlink",gulp.series(bebel_task,postcss_task));

exports.default=gulp.series(clean_dist,gulp.parallel(static_task,bebel_task),postcss_task);

console.log("watch task is runing");
/* eslint-disable */
const path=require("path");
const basic_babel_config = require("@cyber-tools/preset-babel-option");


basic_babel_config.plugins.push([require.resolve("babel-plugin-css-modules-transform"), {
  devMode: true,
  keepImport: true,
  extensions: [".scss"],
  generateScopedName: "[name]__[local]___[hash:8]",
  extractCss: {
    dir: "./dist/",
    relativeRoot: "./src/",
    filename: "[path]/[name].scss"
  }
}]);

basic_babel_config.plugins.push([require.resolve("babel-plugin-module-resolver"), {
  baseUrl:__dirname,
  root: [path.resolve(__dirname,"./src/")],
  alias: {
    "@": "./src/",
    "@@":"./"
  }
}]);

/**
 * @description 按需加载antd组件库
 * @link https://www.npmjs.com/package/babel-plugin-import
 * **/
basic_babel_config.plugins.push([require.resolve("babel-plugin-import"),{
  libraryName: "antd",
  libraryDirectory: "lib",
  style: true
},"antd"]);

/**
 * @description 按需加载antd-mobile组件库
 * @link https://www.npmjs.com/package/babel-plugin-import
 * **/
basic_babel_config.plugins.push([require.resolve("babel-plugin-import"),{
   libraryName: "antd-mobile",
   libraryDirectory: "es",
   style: true
},"antd-mobile"]);

module.exports = basic_babel_config
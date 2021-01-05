/* eslint-disable*/
const sass = require("node-sass");
const deepExtend = require("deep-extend");
const babel_config = require("@cyber-tools/preset-babel-option");


module.exports = deepExtend(babel_config, {
  plugins: [
    ["babel-plugin-file-loader", {
      "context": "",
      "name": "[hash].[ext]",
      "publicPath": "dist/assets",
      "outputPath": "dist/assets",
      "extensions": ["png", "jpg", "jpeg", "gif", "svg"]
    }],
    ["babel-plugin-css-modules-transform", {
      "devMode": true,
      "keepImport": true,
      "extensions": [".scss"],
      "generateScopedName": "[name]__[local]___[hash:8]",
      // "preprocessCss": (styleText, filename) => {
      //   const result = sass.renderSync({ data: styleText, file: filename });
      //   return result.css;
      // },
      "extractCss": {
        "dir": "./dist/",
        "relativeRoot": "./src/",
        "filename": "[path]/[name].scss"
      }
    }]
  ]
});
/* eslint-disable */
const deepExtend = require("deep-extend");
const basic_babel_config = require("@cyber-tools/preset-babel-option");


module.exports = deepExtend(basic_babel_config, {
  plugins: [
    [require.resolve("babel-plugin-css-modules-transform"), {
      devMode: true,
      keepImport: true,
      extensions: [".scss"],
      generateScopedName: "[name]__[local]___[hash:8]",
      extractCss: {
        dir: "./dist/",
        relativeRoot: "./src/",
        filename: "[path]/[name].scss"
      }
    }],
    [require.resolve("babel-plugin-module-resolver"),{
      root: ["./src/"],
      alias: {
        "@": "./src/",
        "@@":"./"
      }
    }]
  ]
});
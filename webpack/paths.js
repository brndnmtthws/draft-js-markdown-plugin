const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  outputPath: path.resolve(__dirname, "../", "build"),
  entryPath: path.resolve(__dirname, "../", "demo/client/index.jsx"),
  templatePath: path.resolve(__dirname, "../", "demo/index.html"),
  imagesFolder: "images",
  fontsFolder: "fonts",
  cssFolder: "css",
  jsFolder: "js",
};

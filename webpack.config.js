const path = require("path");

module.exports = {
  entry: "./src/script.js",
  mode: "development", // Change this to 'production' for production builds
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./src",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 'style-loader' conflicts with MiniCssExtractPlugin
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

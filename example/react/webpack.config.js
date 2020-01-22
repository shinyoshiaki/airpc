const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const dist = __dirname + "/build";

module.exports = {
  devtool: "source-map",
  entry: "./src/index",
  output: {
    path: dist,
    filename: "bundle.js",
    publicPath: ".",
    globalObject: "self"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: { loader: "ts-loader" }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:
        process.env.NODE_ENV === "production"
          ? "./public/index.prod.html"
          : "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ terserOptions: { mangle: true } })]
  }
};

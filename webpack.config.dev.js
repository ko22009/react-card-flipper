const path = require("path");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["./src/index"],
  devtool: "eval-source-map",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.[j|t]s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            plugins: ["react-hot-loader/babel"],
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "/public",
    }),
    new HtmlWebPackPlugin({
      inject: true,
      template: "./public/index.html",
    }),
  ],
};

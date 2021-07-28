const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "src"),
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "/public",
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
};

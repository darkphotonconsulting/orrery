const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify"),
      "url": require.resolve("url")
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    // contentBase: path.join(__dirname, "public/"),
    port: 3000,
    // publicPath: "http://localhost:3000/dist/",
    // hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser',
    })
  ]
};

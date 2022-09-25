const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      /* load images */
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            }
          }
        ]
      },
      /* load JS and JSX */
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      /* load CSS */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  /* TODO: better understand the resolution system, these imports do not work */
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
    port: 3000,
    // contentBase: path.join(__dirname, "public/"),
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

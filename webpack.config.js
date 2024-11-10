const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    static: './build'
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.js$/, loader: "source-map-loader" },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' },
      { test: /\.(wav)$/i, type: 'asset/resource' },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Chrome Dino Game',
      filename: 'index.html'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    })
  ],
}
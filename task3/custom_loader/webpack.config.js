const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    index: './src/index',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader!json-delete-number-attribute',
      },
    ]
  },
  resolveLoader: {
    alias: {
      'json-delete-number-attribute': path.join(__dirname, 'loader', 'json-delete-number-attribute.js')
    }
  },
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    path: path.resolve(__dirname, 'dist')
  }
};

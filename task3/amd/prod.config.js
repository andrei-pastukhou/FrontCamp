const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
  plugins: [

    // Minify JS
    new UglifyJsPlugin({
      sourceMap: false,
      compress: true,
    }),

    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});


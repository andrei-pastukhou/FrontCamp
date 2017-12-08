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
        test: /\.(sass|scss)$/,
        //loader:'style-loader!css-loader!sass-loader',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        }),
      },

    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      template : './src/index.template.ejs',
      inject: 'body',
      title: 'APInews reading...'
    }),
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath('css/[name].css');
      },
      allChunks: false,
    }),

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
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    path: path.resolve(__dirname, 'dist')
  }
};

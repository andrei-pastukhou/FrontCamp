const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {

  devtool: 'eval-source-map',

  devServer: {
    inline: true,
    contentBase: path.join(__dirname, "dist"),
    port: '3001',
  }
});

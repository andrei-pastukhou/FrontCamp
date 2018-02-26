const path = require('path');

const config = {
    entry: {
        "main": ["react-hot-loader/patch", "./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, '../dest/js'),
        publicPath: '/dest/js/',
        filename: '[name].bundle.js',
    },
};

module.exports = config;
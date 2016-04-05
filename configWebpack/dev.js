var config = require('./common.js');
var webpack = require('webpack');

var hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
var NoErrorsPlugin = new webpack.NoErrorsPlugin();

config.module.loaders.push({
  test: /\.css$/,
  loader: 'style-loader!css!postcss!csslint'
});

config.devtool = 'source-map';
config.entry.push('webpack-hot-middleware/client');

config.plugins.push(hotModuleReplacementPlugin);

config.plugins.push(NoErrorsPlugin);

module.exports = config;
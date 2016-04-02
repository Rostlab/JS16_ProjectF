var config = require('./common.js');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ocurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();
var uglifyJsPlugin =  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  });
var extractTextPlugin =  new ExtractTextPlugin("style.css");

config.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader')
});

config.module.preLoaders.push(
  {test: /\.css$/, loader: "csslint-loader", exclude: /node_modules/}
);

config.plugins.push(ocurrenceOrderPlugin);
config.plugins.push(uglifyJsPlugin);
config.plugins.push(extractTextPlugin);

module.exports = config;
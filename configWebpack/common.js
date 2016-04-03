'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var PATH_CLIENT = path.join(__dirname, '../app');
var PATH_DIST = path.join(__dirname, '../build');

var analytics, api, https, prefix;
try {
  var json = require('../config/config.json');
  analytics = json.google_analytics.key;
  api = json.api.host;
  https = json.api.https ? "https://" : "http://";
  prefix = json.api.prefix;
} catch (err) {
  console.log(err);
  analytics = process.env.ANALYTICS;
  api = process.env.API;
  https = process.env.PROTOCOL;
  prefix = process.env.PREFIXDIR;
}

var config = {
  entry: [
    PATH_CLIENT + "/main.jsx"
  ],

  output: {
    path: PATH_DIST,
    filename: "bundle.js",
    publicPath: "/"
  },

  module: {
    preLoaders: [
      {test: /\.jsx$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader:  'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        },
        include: PATH_CLIENT
      }, {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=static/images/[name].[ext]'
      }, {
        test: /\.(woff|woff2)$/,
        loader: "url?prefix=font/&limit=5000"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }, {
        test: /\.md$/,
        exclude: /README.md/,
        loader: 'react-markdown-loader'
      }

    ]
  },

  resolve: {
    modulesDirectories: ['app', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.css']
  },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: PATH_CLIENT + "/index.tmpl.html"
    }),
    new webpack.DefinePlugin({
      GA_TRACKING_CODE: JSON.stringify(analytics),
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        '__API__': JSON.stringify(api),
        '__PROTOCOL__': JSON.stringify(https),
        '__PREFIX__': JSON.stringify(prefix)
      },

    })
  ]
};

module.exports = config;

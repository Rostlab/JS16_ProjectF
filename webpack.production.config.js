'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

try {
    var json = require('./config/config.json');
    var analytics = json.google_analytics.key;
} catch (err) {
    console.log(err);
    var analytics = process.env.ANALYTICS;
}

var config = {
    entry: path.join(__dirname, "/app/main.jsx"),
    output: {
        path: path.join(__dirname, "/build"),
        filename: "/bundle.js"
    },

    module: {
        preLoaders: [
            {test: /\.jsx$/, loader: "eslint-loader", exclude: /node_modules/},
            {test: /\.css$/, loader: "csslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react']
                }
            }, {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react']
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader')
            }, {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=static/images/[name].[ext]'
            },
            {   test: /\.(woff|woff2)$/,
                loader:"url?prefix=font/&limit=5000"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=image/svg+xml"
            }
        ]
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
            template: path.join(__dirname, "/app/index.tmpl.html")
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("/style.css"),
        new webpack.DefinePlugin({GA_TRACKING_CODE: JSON.stringify(analytics)})
    ]
}

module.exports = config;

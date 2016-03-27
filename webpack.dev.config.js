'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var npm_dir = path.join(__dirname, '/node_modules/');

var analytics;
try {
    var json = require('./config/config.json');
    analytics = json.google_analytics.key;
} catch (err) {
    console.log(err);
    analytics = process.env.ANALYTICS;
}

var config = {
    devtool: 'eval-source-map',
    entry: [
      'webpack-hot-middleware/client',
      "./app/main.jsx"
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: '/'
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
                include: path.join(__dirname, 'app')
            },{
                test: /\.css$/,
                loader: 'style-loader!css!postcss!csslint'
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
        extensions: ['', '.js', '.jsx']
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
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({GA_TRACKING_CODE: JSON.stringify(analytics)})
    ],

    devServer: {
        contentBase: "./build",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};

module.exports = config;

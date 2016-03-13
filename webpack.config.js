'use strict';


var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',

    entry: __dirname + "/app/main.jsx",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },

    module: {
        preLoaders: [
            {
                test: /\.jsx$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.css$/,
                loader: 'style-loader!css!postcss?modules!csslint'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=static/images/[name].[ext]'
            }, {
                test: /bootstrap\/js\//,
                loader: 'imports?jQuery=jquery'
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
            }

        ]
    },

    postcss: [
        require('autoprefixer')
    ],

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};

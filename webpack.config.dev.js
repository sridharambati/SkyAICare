'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = {
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, 'src')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        pathinfo: true,
        filename: 'bundle.js',
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: path.resolve(__dirname, '/')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build/*']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './build',
        port: 8080,
        hot: false,
        inline: false,
    }
};

'use strict';

const path = require('path');

console.log(path.join(__dirname, '/dist'));

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: '/app.bundle.js',
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,

            query: {
                plugins: ['transform-es2015-modules-commonjs']
            }
        }]
    },
};


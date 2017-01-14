const path = require('path');

const webpack = require('webpack');
const WebpackCopyPlugin = require('copy-webpack-plugin');
const WebpackWriteFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpackValidator = require('webpack-validator');
const WebpackForceCaseSensitivity = require('force-case-sensitivity-webpack-plugin');

const configDev = require('./configs/webpack/dev');
const configProd = require('./configs/webpack/prod');

const __DEVELOPMENT__ = process.env.NODE_ENV === 'development';

const copyFiles = [{
    from: 'index.html'
}];

if (__DEVELOPMENT__) {
    copyFiles.push({
        from: 'mocks/**'
    });
}

const configCommon = {
    context: path.join(__dirname, 'app'),
    output: {
        publicPath: '/',
        filename: 'js/index.js'
    },
    resolve: {
        root: [
            path.join(__dirname, 'app')
        ]
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'url?name=img/[name].[ext]?[hash]'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file?name=fonts/[name].[ext]?[hash]'
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                include: /node_modules/,
                loader: 'file?name=fonts/[name].[ext]?[hash]'
            },
        ]
    },
    plugins: [
        new WebpackForceCaseSensitivity(),
        new WebpackCopyPlugin(copyFiles),
        new WebpackWriteFilePlugin(),
        new webpack.DefinePlugin({
            __DEVELOPMENT__
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true
    }
};

const config = webpackMerge(configCommon, __DEVELOPMENT__ ? configDev : configProd);

module.exports = webpackValidator(config);

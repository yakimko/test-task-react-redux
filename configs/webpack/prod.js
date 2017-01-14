const webpack = require('webpack');
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin');

const helper = require('./helper');

const outputPath = 'builds/prod';

const createCssLoaderConfig = (cssLoader, options) =>
    Object.assign({
        test: /\.css/,
        loader: WebpackExtractTextPlugin.extract(
            'style',
            `${cssLoader}!resolve-url`,
            {
                publicPath: '../'
            }
        )
    }, options || {});

module.exports = {
    entry: [
        'babel-polyfill',
        './index'
    ],
    output: {
        path: outputPath
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            createCssLoaderConfig(
                `css?minimize&modules&localIdentName=${helper.config.loader.css.localIdentName}`,
                {
                    exclude: helper.config.loader.css.assets
                }
            ),
            createCssLoaderConfig(
                'css?minimize',
                {
                    include: helper.config.loader.css.assets
                }
            )
        ]
    },
    plugins: [
        new WebpackExtractTextPlugin('css/index.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        helper.createWebpackCleanPlugin(outputPath)
    ],
    devServer: {
        hot: false,
        outputPath: `${outputPath}/`
    }
};
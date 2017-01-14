const webpack = require('webpack');

const helper = require('./helper');

const outputPath = 'builds/dev';

const createCssLoaderConfig = (cssLoader, options) =>
    Object.assign({
        test: /\.css/,
        loader: `style!${cssLoader}!resolve-url?sourceMap`
    }, options || {});

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
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
                loaders: [
                    'react-hot',
                    'babel-loader'
                ]
            },
            createCssLoaderConfig(
                `css?modules&localIdentName=${helper.config.loader.css.localIdentName}`,
                {
                    exclude: helper.config.loader.css.assets
                }
            ),
            createCssLoaderConfig(
                'css?sourceMap',
                {
                    include: helper.config.loader.css.assets
                }
            )
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        helper.createWebpackCleanPlugin(outputPath)
    ],
    devServer: {
        hot: true,
        inline: true,
        outputPath: `${outputPath}/`
    },
    devtool: 'source-map'
};

const path = require('path');

const WebpackCleanPlugin = require('clean-webpack-plugin');

const createWebpackCleanPlugin = path => {
    return new WebpackCleanPlugin(
        [
            path
        ],
        {
            root: process.cwd(),
            verbose: true,
            dry: false
        }
    );
};

module.exports = {
    createWebpackCleanPlugin,
    config: {
        loader: {
            css: {
                localIdentName: '[local]__[hash:base64:5]',
                assets: [
                    path.resolve(__dirname + '/../../../app/assets'),
                    path.resolve(__dirname + '/../../../node_modules')
                ]
            }
        }
    }
};

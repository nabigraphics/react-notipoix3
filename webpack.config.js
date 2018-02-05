const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractSass = new ExtractTextPlugin({
    filename: '../css/[name].css',
    allChunks: true
});

const WebpackConfig = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: __dirname + '/lib/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: ['Notipoix3', 'notipoi']
    },
    devServer: {
        contentBase: __dirname + '/dist',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["env", "react"],
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract(['css-loader', 'postcss-loader', 'sass-loader'])
            },
        ]
    },
};

// webpack production config.
if (process.env.NODE_ENV === 'production') {

    WebpackConfig.externals = {
        'react': 'react',
        'react-dom': 'react-dom',
        'immutable': 'immutable',
        'redux': 'redux',
        'react-redux': 'react-redux',
        'react-motion': 'react-motion'
    };

    WebpackConfig.plugins = [
        extractSass,
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ];

}

module.exports = WebpackConfig;

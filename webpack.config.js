const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename:'../css/[name].css',
  allChunks:true
});
const WebpackConfig = {
    entry: {
        index:'./src/index.js',
    },
    output: {
        path: __dirname + '/lib/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract(['css-loader', 'postcss-loader', 'sass-loader'])
            },
        ]
    }
};

// webpack production config.
if (process.env.NODE_ENV === 'production') {

    WebpackConfig.externals = {
        'react': 'react',
        'react-dom': 'react-dom',
        'immutable': 'immutable',
        'redux': 'redux',
        'react-redux': 'react-redux',
        'react-motion':'react-motion'
    };

    WebpackConfig.plugins = [
        extractSass,
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
    ];

}

module.exports = WebpackConfig;

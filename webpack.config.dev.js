const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename:'./css/[name].css',
  allChunks:true
});

const WebpackConfig = {
    entry: {
        dev:'./src/dev.js',
        style:'./lib/react-notipoix3.scss'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        libraryTarget: 'umd',
        library:['Notipoix3','notipoi']
    },
    devServer:{
        contentBase: __dirname + '/dist',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: extractSass.extract(['css-loader', 'postcss-loader', 'sass-loader'])
            },
        ]
    },
    plugins:[
        extractSass
    ]
};

module.exports = WebpackConfig;

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = [{
    entry: path.resolve(__dirname, 'public/vue/web/main.js'),
    output: {
        path: path.resolve(__dirname, 'public/vue/web'),
        filename: '[name].build.js'
    },
    resolve: {
        alias: {
            'root': path.resolve(__dirname),
            'vue$': path.resolve(__dirname,'./node_modules/vue/dist/vue.js'),
        }
    },
    module: {
        rules: [{
            test: /\.vue?$/,
            use: ['vue-loader']
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        },]
    },
    plugins: [
        //''
        new ExtractTextPlugin('[name].css'),
        //
        /*new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),*/
        //
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),*/
    ]
}];

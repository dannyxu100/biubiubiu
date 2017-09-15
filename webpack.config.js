const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = [{
    entry: path.resolve(__dirname, './vue/main.js'),
    output: {
        path: path.resolve(__dirname, './vue'),
        filename: '[name].build.js'
    },
    resolve: {
        alias: {
            'vue$'          : path.resolve(__dirname,'./node_modules/vue/dist/vue.js'),
            '_WEBROOT_'     : __dirname,
            '_ROOT_'        : path.resolve(__dirname, './vue'),
            '_PLUGIN_'      : path.resolve(__dirname, './vue/plugins'),
            '_JS_'          : path.resolve(__dirname, './vue/js'),
            '_LESS_'        : path.resolve(__dirname, './vue/less'),
            '_APPS_'        : path.resolve(__dirname, './vue/apps'),
            '_STORE_'       : path.resolve(__dirname, './vue/store'),
            // '_IVIEW_'       : path.resolve(__dirname, '../dreamix-components/components/web/components'),
            // '_IVIEW_LESS_'  : path.resolve(__dirname, '../dreamix-components/components/web/styles')
        }
    },
    module: {
        rules: [{
            test: /\.vue?$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ['style-loader', 'css-loader', 'less-loader'], // <style lang='less'>
                    }
                }
            }]
        }, {
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
    ],
    watch: true
}];

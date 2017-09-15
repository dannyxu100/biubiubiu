const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = [{
    entry: [
        path.resolve(__dirname, './vue/less/app.less'),
        path.resolve(__dirname, './vue/main.js'),
    ],
    output: {
        path: path.resolve(__dirname, './vue'),
        // publicPath: '',
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
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader'],
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader'],
            })
        }, {
            test: /\.vue?$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    // publicPath: '',
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader'],
                        }),
                        less: ExtractTextPlugin.extract({
                            use: ['css-loader', 'less-loader'],
                        })
                    }
                }
            }]
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        },]
    },
    plugins: [
        //''
        new ExtractTextPlugin('[name].build.css'),
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

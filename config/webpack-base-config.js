const tools             = require('../libs/tools');
const path              = tools.require('path'),
      webpack           = tools.require('webpack');

const HtmlWebpackPlugin = tools.require('html-webpack-plugin');

function R( pathfile ){
    // console.log('----------------'+ path.resolve(__dirname, pathfile));
    return path.resolve(__dirname, pathfile);
}

module.exports = {
    entry: {
        'vue-main': [
            R('../vue/less/app.less'),
            R('../vue/main.js')
        ]
    },
    output: {
        path: R('../public/dist'),
        publicPath: '/public/dist',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'vue$'          : R('../node_modules/vue/dist/vue.js'),
            '_WEBROOT_'     : R('../'),
            '_ROOT_'        : R('../vue'),
            '_PLUGIN_'      : R('../vue/plugins'),
            '_JS_'          : R('../vue/js'),
            '_LESS_'        : R('../vue/less'),
            '_ROUTER_'      : R('../vue/router'),
            '_APPS_'        : R('../vue/apps'),
            '_STORE_'       : R('../vue/store'),
            // '_IVIEW_'       : resolve('../dreamix-components/components/web/components'),
            // '_IVIEW_LESS_'  : resolve('../dreamix-components/components/web/styles')
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            // use: ExtractTextPlugin.extract({
            //     use: ['css-loader'],
            // })
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
            // use: ExtractTextPlugin.extract({
            //     use: ['css-loader', 'less-loader'],
            // })
        }, {
            test: /\.vue?$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    // publicPath: '',
                    loaders: {
                        css: ['style-loader', 'css-loader'],
                        less: ['style-loader', 'css-loader', 'less-loader'],
                        // css: ExtractTextPlugin.extract({
                        //     use: ['css-loader'],
                        // }),
                        // less: ExtractTextPlugin.extract({
                        //     use: ['css-loader', 'less-loader'],
                        // })
                    }
                }
            }]
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            include: [R('../vue')],
            exclude: /node_modules/
        }]
    },
    plugins: [
        //
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"'+ process.env.NODE_ENV +'"'  //development | production
            }
        }),
        //
        new HtmlWebpackPlugin({
            filename            : R('../views/home/index.ejs'),
            template            : R('../views/template/home-index.tmpl'),
            // templateContent     : '',
            ejs                 : {
                title           : '<%=title%>'
            },
            // title               : 'biubiubiu~~~',
            // favicon             : 'static/images/favicon.png',
            // inject              : true,
            minify              : false,
            hash                : true,
            // cache               : true,
            // showErrors          : true,
            // chunks              : [],
            // excludeChunks       : [],
            // chunksSortMode      : 'auto'
        }),
        //
        new HtmlWebpackPlugin({
            filename            : R('../views/admin/index.ejs'),
            template            : R('../views/template/admin-index.tmpl'),
            // templateContent     : '',
            ejs                 : {
                title           : '<%=title%>'
            },
            // title               : 'biubiubiu~~~',
            // favicon             : 'static/images/favicon.png',
            // inject              : true,
            minify              : false,
            hash                : true,
            // cache               : true,
            // showErrors          : true,
            // chunks              : [],
            // excludeChunks       : [],
            // chunksSortMode      : 'auto'
        })
    ]
};

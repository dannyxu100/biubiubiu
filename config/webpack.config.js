const tools             = global.tools;
const path              = tools.require('path'),
      webpack           = tools.require('webpack'),
      webpackmerge      = tools.require('webpack-merge'),
      BASECONFIG        = tools.require('/config/webpack-base-config.js');

const ExtractTextPlugin = tools.require('extract-text-webpack-plugin'),
      UglifyJSPlugin    = require('uglifyjs-webpack-plugin');

function R( pathfile ){
    return path.resolve(__dirname, pathfile);
}

module.exports = webpackmerge(BASECONFIG, {
    plugins: [
        //
        new ExtractTextPlugin('[name].css'),
        //
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]
});

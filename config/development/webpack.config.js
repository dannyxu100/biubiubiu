const tools             = require('../libs/tools');
const path              = tools.require('path'),
      webpack           = tools.require('webpack'),
      webpackmerge      = tools.require('webpack-merge'),
      BASECONFIG        = tools.require('/config/webpack-base-config.js');


function R( pathfile ){
    return path.resolve(__dirname, pathfile);
}

// add hot-reload related code to entry chunks
const webpack_dev_client = R('./webpack-dev-client.js');

Object.keys(BASECONFIG.entry).forEach(function (name, i) {
    BASECONFIG.entry[name] = [webpack_dev_client].concat(BASECONFIG.entry[name]);
    // console.log(BASECONFIG.entry[name]);
});

module.exports = webpackmerge(BASECONFIG, {
    plugins: [
        //
        new webpack.HotModuleReplacementPlugin()
    ]
});

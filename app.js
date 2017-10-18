const tools         = global.tools = require('./libs/tools');
const express       = tools.require('express'),
      path          = tools.require('path'),
      // rm            = tools.require('rimraf'),
      favicon       = tools.require('serve-favicon'),
      logger        = tools.require('morgan'),
      body_parser   = tools.require('body-parser'),
      // multer        = tools.require('multer'),
      cookie_parser = tools.require('cookie-parser'),
      compression   = tools.require('compression'),
      session       = tools.require('express-session'),
      webpack       = tools.require('webpack');

//配置
const CONFIG        = tools.require('/config/config.json'),
      SESSION       = tools.require('/config/session.json');

//路由
const route_index   = tools.require('/routes/common/index.js'),
      route_access  = tools.require('/routes/home/access.js'),
      route_users   = tools.require('/routes/home/users.js');

process.env.NODE_ENV = CONFIG.env;          //development | production
const app = express();

//设置EJS模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Webpack打包
const WEBPACKCONFIG = tools.require('/config/webpack.config.js');
var compiler;

if ('production' === process.env.NODE_ENV) {
    compiler = webpack(WEBPACKCONFIG, (err, stats)=>{
        console.log('webpack err:'+ err);
    });
}
if ('development' === process.env.NODE_ENV) {
    compiler = webpack(WEBPACKCONFIG);
    const dev_middleware = tools.require('webpack-dev-middleware')(compiler, {
        // noInfo: true,
        publicPath: WEBPACKCONFIG.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });
    const hot_middleware = tools.require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 2*1000
    });

    /*// force page reload when html-webpack-plugin template changes
    // currently disabled until this is resolved:
    // https://github.com/jantimon/html-webpack-plugin/issues/680
    compiler.plugin('compilation', (compilation)=>{
        console.log(1111111111);
        compilation.plugin('html-webpack-plugin-after-emit', (data, callback)=>{
            //发布事件 reload,这个事件会在config/webpack-dev-client.js中接受到，然后刷新
            console.log(1111111111);
            hot_middleware.publish({action:'reload'});
            callback();
        });
    });*/
    console.log(1111111111);
    app.use(dev_middleware);
    app.use(hot_middleware);
}

//静态路由
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vue', express.static(path.join(__dirname, 'vue')));

app.use(logger('dev'));
app.use(compression());
app.use(body_parser.json());                                            // for parsing application/json
app.use(body_parser.urlencoded({ extended: false }));                   // for parsing application/x-www-form-urlencoded
// app.use(multer());                                                       // for parsing multipart/form-data
app.use(cookie_parser());


app.use(session({
    secret: SESSION.secret,
    cookie: {maxAge: SESSION.maxAge, secure: false},
    resave: false,
    saveUninitialized: true
}));

app.use('/', route_index);
app.use('/access', route_access);
app.use('/users', route_users);

// catch 404 and forward to error handler
app.use((req, res, next)=>{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if ('development' === process.env.NODE_ENV) {
    app.use((err, req, res, next)=>{
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

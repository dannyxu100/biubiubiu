var express       = require('express'),
    path          = require('path'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    body_parser   = require('body-parser'),
    // multer        = require('multer'),
    cookie_parser = require('cookie-parser'),
    compression   = require('compression'),
    session       = require('express-session');

global.tools  = require('./libs/tools');
const tools   = global.tools;


const CONFIG  = tools.require('/config/config.json'),
      SESSION = tools.require('/config/session.json');


const route_index   = tools.require('/routes/common/index.js'),
      route_access  = tools.require('/routes/home/access.js'),
      route_users   = tools.require('/routes/home/users.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/static', express.static(path.join(__dirname, 'public')));
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
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

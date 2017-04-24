var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookie_parser = require('cookie-parser'),
	body_parser = require('body-parser'),
	compression = require('compression'),
	session = require('express-session');
	
global.tools = require('./libs/tools');

var CONFIG = tools.require('/config/config.json'),
	SESSION = tools.require('/config/session.json');

	
var routes = tools.require('/routes/index.js'),
	users = tools.require('/routes/web/users.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/favicon.png')));
app.use(logger('dev'));
app.use(compression());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	secret: SESSION.secret,
	cookie: {maxAge: SESSION.maxAge, secure: false},
	resave: false,
	saveUninitialized: true
}));

app.use('/', routes);
app.use('/users', users);

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

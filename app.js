// import * as start from 'consoleBrow/index';
var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var consoleTest = require('./routes/test.console');


var app = express();
require('./consoleBrow/index')(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/console', consoleTest);


// catch 404 and forward to error handler
app.use(function(req, res, next) {  
  var err = new Error(`Route Not Found ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

module.exports = app;

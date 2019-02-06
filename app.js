var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var expressHbs = require('express-handlebars');
var validator = require('express-validator');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var userRouter = require('./routes/users');
var indexRouter = require('./routes/index');

var app = express();

//connecting to mongoose
mongoose.connect('mongodb://localhost:27017/shopping', function(){
  console.log("Connected to DB...");
});
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'ZionLloyd',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//a middleware executed in all request
app.use(function(req, res, next){
  //setting a global props with res.locals so it can be available to the view
  res.locals.login = req.isAuthenticated();

  //making session available to view
  res.locals.session = req.session;
  next();
});

app.use('/user', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

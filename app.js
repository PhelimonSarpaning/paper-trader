const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const request = require('request');
const bodyparser = require('body-parser');
const session = require('express-session');
const db = require('./models');
const dbservice = require('./dbservice.js');

//START OF THE DATABASE LOOP
dbservice.loop();

// Declaring route handlers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const stockRouter = require('./routes/stock');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const dashboardRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyparser.json());



app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stock', stockRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/logout', logoutRouter);


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err);
});

module.exports = app;

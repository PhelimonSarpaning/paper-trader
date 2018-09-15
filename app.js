var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const request = require('request');
const bodyparser = require('body-parser');
const db = require('./models');


//START OF THE DATABASE LOOP
db.sequelize.sync().then((onFulfilled) => {
  db.Indice
    .findOrCreate({ where: { symbol: 'djia' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)

      /*
       findOrCreate returns an array containing the object that was found or created and a boolean that will be true if a new object was created and false if not, like so:
  
      [ {
          username: 'sdepold',
          job: 'Technical Lead JavaScript',
          id: 1,
          createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
          updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
        },
        true ]
  
   In the example above, the "spread" on line 39 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 39, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true".)
      */
    });
  db.Indice
    .findOrCreate({ where: { symbol: 'inx' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)
    });

    db.Indice
    .findOrCreate({ where: { symbol: 'rut' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)
    });

    db.Indice
    .findOrCreate({ where: { symbol: 'ixic' } })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)
    });

  function intervalFunc() {
    let dprice;
    let sprice;
    let rprice;
    let nprice;
    request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=DJIA&apikey=5HIDPCV4IGFUOO8D', (error, response, body) => {
      let json = JSON.parse(body);
      dprice = (json['Global Quote']['05. price']);
      db.Indice.findOne({ where: { symbol: 'djia' } }).then((djia) => {
        djia.set('currentprice', dprice);
        djia.save();
      });
    });

    request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=INX&apikey=5HIDPCV4IGFUOO8D', (error, response, body) => {
      let json = JSON.parse(body);
      sprice = (json['Global Quote']['05. price']);
      db.Indice.findOne({ where: { symbol: 'inx' } }).then((inx) => {
        inx.set('currentprice', sprice);
        inx.save();
      });

    });

    request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=^RUT&apikey=5HIDPCV4IGFUOO8D', (error, response, body) => {
      let json = JSON.parse(body);
      rprice = (json['Global Quote']['05. price']);
      db.Indice.findOne({ where: { symbol: 'rut' } }).then((rut) => {
        rut.set('currentprice', rprice);
        rut.save();
      });

    });

    request('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IXIC&apikey=5HIDPCV4IGFUOO8D', (error, response, body) => {
      let json = JSON.parse(body);
      nprice = (json['Global Quote']['05. price']);
      db.Indice.findOne({ where: { symbol: 'ixic' } }).then((ixic) => {
        ixic.set('currentprice', nprice);
        ixic.save();
      });

    });


    console.log('Price updated');

  }

  setInterval(intervalFunc, 120000);
});




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyparser.json());



app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

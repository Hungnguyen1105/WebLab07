var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// khai bao router
var studentRouter = require('./routes/student');

var app = express();
//khai bao body parser
var bodyPaser = require('body-parser');
app.use(bodyPaser.urlencoded({extended: false}));

//khia bao va cau hinh mongoose
var mongoose = require('mongoose');
var uri = "mongodb+srv://hbday2k3:hungnguyen2003@cluster0.f3h6kv6.mongodb.net/gch1105"
mongoose.connect(uri)
.then(() => console.log('db connect ok'))
.catch((err) => console.error('db connect failed'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter);
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))
hbs.registerHelper('dateFormat', require('handlebars-dateformat')); 

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
// cau hinh port de deploy len cloud
app.listen (process.env.PORT||3001);



module.exports = app;

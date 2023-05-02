require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var logger = require('morgan');
const mongoose = require("mongoose");

mongoose
  .set("strictQuery", false)
  .set("strictPopulate", false)
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Established a connection to the database'))
  .catch(err => console.log('Something went wrong when connecting to the database ', err))

const indexRouter = require('./routes/index')
const adminRouter = require('./routes/admins/adminRouter')
const userRouter = require('./routes/users/userRouter')
const menuRouter = require('./routes/menu/menuRouter')
const postRouter = require('./routes/posts/postRouter')
const commentRouter = require('./routes/comments/commentRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/admins', adminRouter)
app.use('/users', userRouter)
app.use('/menu', menuRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

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

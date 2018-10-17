require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors   = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
//const bcrypt = require("bcrypt");   estan en passport.js
const passport      = require('passport');
require('./configs/passport');

const authRouter  = require('./routes/authroutes');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const galleryRouter = require('./routes/gallery');


mongoose
  .connect('mongodb://localhost/artcafe', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
//const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(passport.initialize()); //passport
app.use(passport.session());    //passport


app.use('/', indexRouter);
app.use('/', authRouter); //to localhost:3000/signup get post
app.use('/users', usersRouter);
app.use('/gallery',galleryRouter);

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

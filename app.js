require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');

require('./config/db.config');
require('./config/hbs.config');
require('./config/passport.config');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(logger('dev'));
app.use(flash());

// Config Session
const sessionConfig = require('./config/session.config');
app.use(sessionConfig);

// Config HBS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// Flash Middleware
app.use((req, res, next) => {
    res.locals.flashMessage = req.flash('flashMessage');
    next();
})

// Config routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next()
})

const router = require('./config/routes.config');
app.use('/', router);

// Error Handling
app.use((req, res, next) => {
    next(createError(404, 'Page not found'));
});
  
app.use((error, req, res, next) => {
    console.log(error);
    let status =  error.status || 500;
    res.status(status).render('error', {
      message: error.message,
      error: req.app.get('env') === 'development' ? error : {}
    })
});


// Config PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on ${port}`);
});
  


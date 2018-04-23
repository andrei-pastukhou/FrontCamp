const express = require('express');
const mongoose = require('mongoose');
import {config} from './config/config.js';
import {JWTpassportCallback} from './bin/utils/utils.js'
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const blogs = require('./routes/blogs');
const passport = require('passport');
const cors = require('cors');

//Set up default mongoose connection
mongoose.connect(config.mongodb.connectionUrl, config.mongodb.options);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors(config.corsOPtions));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')(config.expressSession));
passport.use(JWTpassportCallback());

app.use('/', index);
app.use('/blogs', blogs);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use('*', function (err, req, res, next) {
    //res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

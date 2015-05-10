var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;
//var registry = require('simple-registry');

global.appRoot = path.resolve(__dirname);

/**
 * Initialize db
 */

var Datastore = require('nedb');

var db = {};
db.products = new Datastore({ filename: './data/products.db', autoload: true });
db.users = new Datastore({ filename: './data/users.db', autoload: true });
db.categories = new Datastore({ filename: './data/categories.db', autoload: true });

global.db = db;

//MongoClient.connect('mongodb://127.0.0.1:27017/meanCourse', function(err, db) {
//  if (err) {
//    console.log('Si è verificato un errore');
//    console.log(err);
//    process.exit(1);
//    return;
//  }
//  console.log("Check for MongoConnection");
//  console.log(new Date());
//  registry.set('mongodbConnection', db);
//  var collection = db.collection('test_connection');
//  collection.insert({
//    'result': 'ok',
//    'date': new Date()
//  }, function(err, result) {
//    if (err) {
//      console.log(err);
//      return;
//    }
//    console.log('MongoDb initialization OK!');
//  })
//});


// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
  // handle the error safely
  console.log('ERROR uncaughtException');
  console.log(err);
  console.log(err.stack);
  process.exit(1);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
var session = require('express-session');
app.use(session({
  secret: 'S3cr3T',
  resave: true,
  saveUninitialized: true,
  cookie: {path: '/', httpOnly: false}
}));
app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes')(app);

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

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
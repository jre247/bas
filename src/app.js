var _         = require('lodash'),
    Promise   = require('bluebird'),
    path      = require('path');

var Logger    = require('./utils/logger');
global.logger = new Logger();

var express   = require('express'),
    app       = express(),
    router    = express.Router();

app.use(require('morgan')('dev'));

var controllers = require('./controllers');

app.get('/favicon*', function(req, res, next) {res.end('')})

app.get('/:bucket?',            controllers.adTagController.getAdTag);

app.delete('/cache/:storeKey?', controllers.cacheController.clear);

app.get('/misc/ping', function(req, res, next) {
  res.send('OK');
  res.end('');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end('');
  logger.error(err);
});

module.exports = app;

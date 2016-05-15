var _         = require('lodash');
var Promise   = require('bluebird');
var config    = require('./../config');
var Logger    = require('./../utils/logger');
var logger = new Logger();

var redis = require('redis');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var redisServerCfg = config.redis.server;
var redisClient = redis.createClient(redisServerCfg.port, redisServerCfg.host, redisServerCfg);

var cacheHelper = require('./../helpers/cache-helper');
var errorHelper = require('./../helpers/error-helper');


function testClient() {

  var loopTimes = 5;
  var interval = setInterval(function() {
    if(loopTimes == 0) {
      clearInterval(interval);
      return;
    }
    loopTimes--;

    var key = 'test' + _.uniqueId();
    logger.info('setting key', key)
    redisClient.setAsync(key, key)
    .then(function() {
      logger.success('set key', key);
      logger.info('getting key', key)
      return redisClient.getAsync(key)
    })
    .then(function() {
      logger.success('got key', key)
    })
    .catch(function() {
      logger.error(arguments)
    })
  }, 1000)
}

testClient();

module.exports = {};

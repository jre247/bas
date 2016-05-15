var _         = require('lodash');
var Promise   = require('bluebird');
var config    = require('./../config');

var redis = require('redis');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var redisServerCfg = config.redis.server;
var redisClient = redis.createClient(redisServerCfg.port, redisServerCfg.host, redisServerCfg);

var Logger    = require('./../utils/logger');
var logger = new Logger();

var cacheHelper = require('./cache-helper');
var errorHelper = require('./error-helper');

var redisHelper = {
  getCachedStoreValuePromise: function getCachedStoreValuePromise(storeKey) {

    return new Promise(function(resolve, reject) {
      if (cacheHelper.get(storeKey)) {
        // Item is already available. Resolve
        resolve(cacheHelper.get(storeKey))
      } else {
        // Item is not available. Retrieve from Redis
        redisClient.getAsync(storeKey)
        .then(function(storeValueStr) {
          // Parse and cache the storeValue
          var storeValue = JSON.parse(storeValueStr);

          if (_.isString(storeValue)) {
            storeValue = JSON.parse(storeValue);
          }

          if (_.isObject(storeValue) ) {
            // Only cache the value, if the item exists on Redis
            cacheHelper.set(storeKey, storeValue);
            resolve(storeValue);
          } else {
            // Item does not exist on Redis. This should not be cached,
            //  since future requests will continue returning null, even if new value is inserted afterwards.
            reject(errorHelper.redis.adNotFound(storeKey));
          }
        })
        .catch(function onRedisGetAsyncError(e){
          reject(errorHelper.redis.general(storeKey));
        });
      }
    });
  }
};

module.exports = redisHelper;

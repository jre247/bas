
var redisHelper = require('./../helpers/redis-helper');
var macroHelper = require('./../helpers/macro-helper');

var adTagController = {};

adTagController.getAdTag = function getAdTag(req, res, next) {
  // Consider requests to /?id=... to be the pro bucket
  var bucket  = req.params.bucket || (req.params.bucket = 'pro');
  var adTagId = req.query.id || (req.query.id = 0);
  var storeKey = bucket + '_' + adTagId;

  // Apply updates to the storeKey based on other query params.

  // Apply storeKey updates for Roku
  var rokuAdId = req.query.Roku_Ad_Id;
  if(rokuAdId) {
    // This is a Roku Ad. It could either be RAF or DI
    if(rokuAdId === '%Roku_Ad_Id%') {
      // The macro hasn't been replaced by the client. It's RAF
      storeKey += '_raf';
    } else {
      // The macro was replaced by the client. It's DI
      storeKey += '_di';
    }
  }


  // Retrieve cached storeValue (originally from Redis), and make any macro replacements
  redisHelper.getCachedStoreValuePromise(storeKey)
  .then(function onGetCachedStoreValueSuccess(storeValue) {
    logger.success(storeValue)
    // Prepare a response with all the macros replaced.
    var response = macroHelper.getReplacedMacrosResponse({
      adTagId     : adTagId,
      rokuAdId    : rokuAdId,
      bucket      : bucket,
      req         : req,
      res         : res,
      storeKey    : storeKey,
      storeValue  : storeValue
    });

    var responseType = storeValue.ResponseType;
    res.header("Content-Type", responseType);
    res.send(responseType == 'application/json' ? JSON.parse(response) : response);
    res.end();
  })
  .catch(function onGetAdTagError(e) {
    var msg = e.message || 'No error message found';
    try{
      msg = JSON.parse(msg)
    }
    catch (e) {}

    logger.error(msg)
    res.send(msg);
    res.end();
  })
};

module.exports = adTagController;

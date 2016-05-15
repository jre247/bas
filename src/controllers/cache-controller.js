var cacheHelper = require('./../helpers/cache-helper');

module.exports = {
  clear: function clear(req, res, next) {
    var storeKey = req.params.storeKey;

    if (cacheHelper.get(storeKey)) {
      cacheHelper.clear(storeKey);
      logger.success('Deleted item from server cache. storeKey: ' + storeKey);
      res.json({deleted: true})
    } else {
      res.json({deleted: false})
    }
    res.end();
  }
}

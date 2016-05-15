var _ = require('lodash');

module.exports = {
  redis: {
    adNotFound: function(storeKey) {
      return new Error(JSON.stringify({typeId: 0, id: _.uniqueId(), message: 'Error: Ad was not found on redis for storeKey: ' + storeKey}))
    },
    general: function(storeKey) {
      return new Error(JSON.stringify({typeId: 1, id: _.uniqueId(), message: 'Error: While fetching/caching value from Redis for storeKey: ' + storeKey}));
    }
  }
}

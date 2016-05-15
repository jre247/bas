// This module returns a singleton that uses an internal hash for caching

function CacheHelper(){
  // Initialize the singleton
  this.cache = {};

  return this;
};

CacheHelper.prototype.get = function get(storeKey) {
  return this.cache[storeKey];
};
CacheHelper.prototype.set = function get(storeKey, storeValue) {
  return (this.cache[storeKey] = storeValue);
};
CacheHelper.prototype.clear = function clear(storeKey) {
  delete this.cache[storeKey];
};

module.exports = new CacheHelper();

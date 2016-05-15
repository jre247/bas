var argv = require('minimist')(process.argv.slice(2));
var Logger    = require('./utils/logger');
var logger = new Logger();
var _ = require('lodash');

// Base config, used by all environments
var configBase = {

};

var configLocal = _.defaultsDeep(configBase, {
  redis: {
    server: {
      host: 'dev-adserver.redis.cache.windows.net',
      port: 6380,
      auth_pass: 'WkcQO0fPUvh/8WHVenh0pDKudRj8B5QkoT7BRnglFC4=',
      tls: {
        servername: 'dev-adserver.redis.cache.windows.net'
      }
    }
  }
});

var configDev = _.defaultsDeep(configBase, {
});

var configUat = _.defaultsDeep(configBase, {
});

var configPro = _.defaultsDeep(configBase, {
});

// Choose the config, based on env.
// Refer to https://github.com/substack/minimist#example for passing args.
var config = {
  local : configLocal,
  dev   : configDev,
  uat   : configUat,
  pro   : configPro
}[argv.env];

if (!config) {
  logger.error("An 'env' argument is required for choosing the proper configuration.");
} else {
  logger.success("Using config for env: " + argv.env, config)
}

module.exports = config;

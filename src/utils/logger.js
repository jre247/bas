var colors = require('colors/safe');
var _ = require('lodash');
var stack = require('callsite');
var pathRoRegexp = require('path-to-regexp');
var path = require('path');

function Logger(optsCustom) {
  this.opts = _.defaultsDeep(optsCustom, {
    logToDB: true,
    ignoreCallSitesHash: {
      fileNames: ['node_modules'],
      functions: ['processImmediate']
    },
    stackLengthNormal: 1,
    stackLengthError: 10
  });
  this.opts.ignoreCallSites = [].concat(
    this.opts.ignoreCallSitesHash.fileNames,
    this.opts.ignoreCallSitesHash.functions
  );
  return this;
}

// Refer to https://github.com/Marak/colors.js
var logTypeToColorThemeMap = {
  log: ['grey'],
  info: ['cyan'],
  success: ['green'],
  warn: ['yellow'],
  error: ['red']
}
colors.setTheme(logTypeToColorThemeMap);

_.each(logTypeToColorThemeMap, function(colorTheme, logType) {
  Logger.prototype[logType] = function() {
    var args = Array.prototype.slice.call(arguments);
    var opts = this.opts;
    var ignoreCallSites = opts.ignoreCallSites;

    // Prepare a readable CallSite string.
    var callSitesAll = stack();
    var callSites;
    if (logType == 'error') {
      callSites = _.take(callSitesAll.slice(1), opts.stackLengthError);
    } else {
      callSites = _.take(callSitesAll.slice(1), opts.stackLengthNormal);
    }

    _.chain(callSites)
      .filter(function (callSite) {
        var fileName = callSite.getFileName() || '';
        var functionName = callSite.getFunctionName() || 'anonymousFn'

        // Filter out callSites that are to be ignored.
        return _.filter(ignoreCallSites, function(ignorableStr) {
          return fileName.indexOf(ignorableStr) >= 0 || functionName.indexOf(ignorableStr) >= 0;
        }).length == 0
      })
      .each(function(callSite) {
        var stackInfo = unescape(pathRoRegexp.compile("\n => :fileName\::lineNumber :functionName()")({
          fileName      : callSite.getFileName(),
          functionName  : callSite.getFunctionName() || 'anonymousFn',
          lineNumber    : callSite.getLineNumber()
        }));
        args.push(stackInfo);
      })
      .value()
    args.push('\n')

    // Ensure all objects are stringified for improved formatting.
    var argsAsStrings = _.map(args, function(arg) {
      if(_.isObject(arg)) {
        // Object
        return JSON.stringify(arg, null, 2)
      } else if (!_.isString(arg)){
        // Not string
        return "" + arg;
      } else {
        // String
        return arg
      }
    });

    // Apply colorTheme
    var argsColored = _.map(argsAsStrings, function(argAsString) {
      return colors[logType](argAsString)
    });

    // Log to console
    console.log.apply(console, argsColored);

    // Log to a flat file or DB

  }

});

module.exports = Logger;

var _ = require('lodash');

var macroHelper = {
  getReplacedMacrosResponse: function getReplacedMacrosResponse(options) {
    var storeValue = options.storeValue;
    var response = storeValue.AdResponseData;


    // Replace Ad level macros
    var metadata = storeValue.Metadata || {};
    var responseUpdated = response
      .replace( /\"%%METADATA%%\"/g, JSON.stringify(metadata) )
      .replace( /%%METADATA.ad_id%%/g, storeValue.AdId )
      .replace( /%%METADATA.companion_tag_id%%/g, storeValue.companion_tag_id || '' )
      .replace( /%%TIMESTAMP%%/g, new Date().getTime() )

    // Impression level macros should not be replaced only when explicitly set to false.
    // In other words, it should be replaced when replaceImpLevelMacros is undefined, or set to true.
    /*
        defined value   replace?
          T      T        T
          T      F        F
          F      x        T
    */
    if (metadata.replaceImpLevelMacros || _.isUndefined(metadata.replaceImpLevelMacros)) {
      responseUpdated = responseUpdated
        // Replace APPSESSIONID
        .replace( /%%APPSESSIONID%%/g, (options.req.query.asid || '') )

        // Replace TRACKINGID
        .replace( /%%TRACKINGID%%/g, (options.req.query.tid || '') )
    }

    responseUpdated = responseUpdated.replace(/%%Roku_Ad_Id%%/g, storeValue.CompanionAdId || '%Roku_Ad_Id%');

    return responseUpdated;
  }
};

module.exports = macroHelper;

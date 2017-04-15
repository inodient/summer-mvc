exports.executeService = function( req, model, pathes ){
  console.log( "executeService : service2" );

  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = JSON.stringify( req.query );
  model.params = JSON.stringify( req.params );
  model.contextDispatcher = require("../js/common.js").parsePath(pathes.dispatcherPath + "/" + pathes.dispatcherJS);
  model.controllerDispatcher = require("../js/common.js").parsePath(pathes.controllerDispatcherPath + "/" + pathes.controllerDispatcherJS);
  model.servicer += " / service1.js";

  return model;
}

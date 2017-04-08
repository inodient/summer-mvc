exports.control = function( req, pathes ){
  var model = {};

  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = JSON.stringify( req.query );
  model.params = JSON.stringify( req.params );
  model.contextDispatcher = pathes.dispatcherPath + "/" + pathes.dispatcherJS;
  model.controllerDispatcher = pathes.controllerDispatcherPath + "/" + pathes.controllerDispatcherJS;
  model.servicer = "-";

  return model;
}

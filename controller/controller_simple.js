exports.control = function( req ){
  var model = {};

  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = JSON.stringify( req.query );
  model.params = JSON.stringify( req.params );
  model.contextDispatcher = "context_dispatcher.js"
  model.controllerDispatcher = "controller_dispatcher.js";
  model.servicer = "-";

  return model;
}

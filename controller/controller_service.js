exports.control = function( req, controllerDispatcher  ){
  var model = {};

  // Type 01 : call service seperately
  // controllerDispatcher.dispatching( req, "service1" );

  // Type 02 : call service flow
  controllerDispatcher.dispatching( req, "callServiceChain", true );



  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = JSON.stringify( req.query );
  model.params = JSON.stringify( req.params );
  model.contextDispatcher = "context_dispatcher.js"
  model.controllerDispatcher = "controller_dispatcher.js";
  model.servicer = "-";

  return model;
}

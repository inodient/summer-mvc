exports.control = function( req, res, connection, controllerDispatcher  ){
  var model = {};

  // Type 01 : call service seperately
  // controllerDispatcher.dispatching( req, "service1" );

  // Type 02 : call service flow
  connection.destroySession();
  connection.clearCookie( "userName" );

  // controllerDispatcher.dispatching( req, res, connection, "callServiceChain", true );

  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = JSON.stringify( req.query );
  model.params = JSON.stringify( req.params );
  model.contextDispatcher = "context_dispatcher.js"
  model.controllerDispatcher = "controller_dispatcher.js";
  model.servicer = "-";

  return model;
}

exports.executeService = function( req, model ){
  console.log( "executeService : service3" );

  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = JSON.stringify( req.query );
  model.params = JSON.stringify( req.params );
  model.contextDispatcher = "contextDispatcher";
  model.controllerDispatcher = "controllerDispatcher";
  model.servicer += " / service1.js";

  return model;
}

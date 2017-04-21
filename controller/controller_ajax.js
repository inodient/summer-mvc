exports.control = function( req, res, connection, controllerDispatcher, callback ){
  var model = {};

  model.contents = "This is ajax test result.";

  callback( null, model );

  // return model;
}

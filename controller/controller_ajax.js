exports.control = function( req, res, callback ){
  var model = {};

  try{
    model.ajaxResult = "Called with [" + req.query[ "text" ] + "]";
    callback( null, model );
  } catch( err ){
    callback( err, model );
  }
}

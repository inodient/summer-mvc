exports.control = function( req, res, controllerDispatcher, callback ){

  setModel( req, res, callback );
}

function setModel( req, res, callback ){
  var model = {};

  try{
    model.method = req.method;
    model.path = req._parsedUrl.pathname;
    model.postMessage = req.body.postMessage;
    model.queryString = JSON.stringify( req.query, null, 4 );
    model.params = JSON.stringify( req.params, null, 4 );
    model.controllerName = require( "path" ).basename( __filename );
    model.controlFunction = "control";
    model.dbRes = "-";
    model.ajaxResult = "-";

    callback( null, model );
  } catch( err ){
    callback( err, model );
  }

}

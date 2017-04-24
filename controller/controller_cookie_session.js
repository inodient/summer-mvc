exports.control = function( req, res, callback ){

  connection = new connectionHandler( req, res );

  if( req.query.cookieKey && req.query.cookieValue ){
    connection.setCookie( req.query.cookieKey, req.query.cookieValue );
  } else if( req.query.sessionKey && req.query.sessionValue ){
    connection.setSession( req.query.sessionKey, req.query.sessionValue );
  }

  if( callback ){
    setModel( req, res, null, null, callback );
  }

  this.connection = null;
}



function setModel( req, res, results, fields, callback ){
  var model = {};

  model.method = req.method;
  model.path = req._parsedUrl.pathname;
  model.postMessage = "";
  model.queryString = JSON.stringify( req.query, null, 4 );
  model.params = JSON.stringify( req.params, null, 4 );
  model.controllerName = require( "path" ).basename( __filename );
  model.controlFunction = "control";
  model.dbRes = "-";
  model.ajaxResult = "-";

  callback( null, model );
}

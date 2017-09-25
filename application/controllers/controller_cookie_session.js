exports.control = function( req, res ){
	return new Promise( function(resolve, reject){
		var connHandler = new connectionHandler( req, res );


		if( req.query.cookieKey && req.query.cookieValue ){
//			connHandler.getCookie( "1", function( results ){
//				logger.debug( results );
//			} );
//			connHandler.setCookie( req.query.cookieKey, req.query.cookieValue );
//			logger.debug( connHandler.getCookie() );
//			
//			connHandler.clearCookie( "1" );
			
		 } else if( req.query.sessionKey && req.query.sessionValue ){

//			 connHandler.saveSession();
			 connHandler.setSession( req.query.sessionKey, req.query.sessionValue );
			 connHandler.getSession( function(results, err){
				 if( err ) reject( err );
			 });
			 
			 connHandler.getSession( "1515", function(results, err){
				 if( results ){
					 //connHandler.setSessionTimeout( 10000 );
					 connHandler.touchSession();
					 connHandler.saveSession();
				 }
			 } );
		 }

		resolve( setModel(req, res) );

	} );
}




function setModel( req, res ){
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

  return model;
}

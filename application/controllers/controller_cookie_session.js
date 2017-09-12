exports.control = function( req, res ){
	return new Promise( function(resolve, reject){
		var connHandler = new connectionHandler();

		connHandler.setConnectionInfo( req, res );

		// if( req.query.cookieKey && req.query.cookieValue ){
		// 	connHandler.getCookie()
		// 	.then( connHandler.setCookie.bind(null, req.query.cookieKey, req.query.cookieValue) )
		// 	.then( connHandler.clearCookie.bind(null, req.query.cookieKey) )
		// 	.catch( function(err){
		// 		reject(err);
		// 	});
		//
		//  } else if( req.query.sessionKey && req.query.sessionValue ){
		// 	 connHandler.getSession()
 	// 		.then( connHandler.setSession.bind(null, req.query.sessionKey, req.query.sessionValue) )
 	// 		.then( connHandler.destroySession )
 	// 		.catch( function(err){
 	// 			reject(err);
 	// 		});
		//  }

		if( req.query.cookieKey && req.query.cookieValue ){
			connHandler.getCookie( "aaa", function( results){
				logger.info( results );
			});
			// connHandler.setCookie( req.query.cookieKey, req.query.cookieValue );
			// connHandler.clearCookie( req.query.cookieKey );
		 } else if( req.query.sessionKey && req.query.sessionValue ){
			// connHandler.getSession();
 		// 	connHandler.setSession( req.query.sessionKey, req.query.sessionValue );
 		// 	connHandler.destroySession();
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

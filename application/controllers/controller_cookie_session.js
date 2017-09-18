exports.control = function( req, res ){
//	try{
//		throw "TEST ERROR";
//	} catch(err){
//		throw err;
//	}
//	
//	return setModel( req, res );
	
	return new Promise( function(resolve, reject){
		var connHandler = new connectionHandler( req, res );

//		connHandler.setConnectionInfo( req, res );

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
			
			connHandler.getCookie( "asdf", function(results){
				logger.info( results );
			});
			 connHandler.setCookie( req.query.cookieKey, req.query.cookieValue );
			 connHandler.clearCookie( req.query.cookieKey );
		 } else if( req.query.sessionKey && req.query.sessionValue ){
			// connHandler.getSession();
 		// 	connHandler.setSession( req.query.sessionKey, req.query.sessionValue );
 		// 	connHandler.destroySession();
		 }
		
//		logger.debug( connHandler.getCookie("inodient") );
//		connHandler.setCookie( "inodient", "sexy" );
//		
//		connHandler.clearCookie( "inodient" );
//		connHandler.clearCookie( "inodient" );

		
		
		
		
		
		
		
		console.log( req.session );
//		req.session.regenerate( function(err){
//			logger.error( err );
//		});
//		
//		req.session.destroy( function(err){
//			logger.error( err );
//		});
		
		req.session.cookie.expires = new Date(Date.now() + 3600000);
		
		logger.debug( req.session.id );
		logger.debug( req.session.cookie );
		logger.debug( req.session.cookie.maxAge );
		logger.debug( req.sessionID );
		
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

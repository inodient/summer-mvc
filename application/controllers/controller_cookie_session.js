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
			
//			connHandler.getCookie( "asdf", function(results, err){
//				if( err ) reject( err );
//			});
//			connHandler.setCookie( req.query.cookieKey, req.query.cookieValue );
//			 connHandler.clearCookie( req.query.cookieKey );
		 } else if( req.query.sessionKey && req.query.sessionValue ){
			// connHandler.getSession();
 		// 	connHandler.setSession( req.query.sessionKey, req.query.sessionValue );
 		// 	connHandler.destroySession();
		 }
		
		
		connHandler.getSession( function( ses, err ){
			logger.debug( ses );
			if( err ) logger.error( err )
		} );
		
		connHandler.setSession( "teasdfstId", "TEST", function( results, err ){
//			logger.error( err );
		} );
		
//		connHandler.destroySession();
		
//		req.session.destroy( function(err){
//			if(err) logger.error( err );
//		});
		
		
//		logger.debug( connHandler.getCookie("inodient") );
//		connHandler.setCookie( "inodient", "sexy" );
//		
//		connHandler.clearCookie( "inodient" );
//		connHandler.clearCookie( "inodient" );

		
		
//		logger.debug( req.session );

//		if( !(req.session.userName) ){
//			req.session.userName = "INODIENT! Remember parents";
////			logger.debug( req.session.userName );
//		}
		
//			if( !(req.session.userName) ){
//				req.session.userName = "INODIENT! Remember parents";
////				logger.debug( req.session.userName );
//			}
//			
//			if( !(req.session.redisCompleted) ){
//				req.session.redisCompleted = "test";
////				logger.debug( req.session.userName );
//			}
//			
//			if( !(req.session.testtesttest) ){
//				req.session.testtesttest = "testtesttest";
////				logger.debug( req.session.userName );
//			}
//			
//			if( !(req.session.kkkkkk) ){
//				req.session.kkkkkk = "kkkkkk";
////				logger.debug( req.session.userName );
//			}
//			
//			if( !(req.session.asdf) ){
//				req.session.asdf = "asdf";
////				logger.debug( req.session.userName );
//			}
//			
//			if( req.session.id ){
//				logger.debug( req.session.id );
//			}
			
//			req.session.destroy( function(err){
//				if(err) logger.error( err );
//			});

		

		
		
//		logger.debug( req.session.userName );

//		connHandler.getSession( "userName" )
//		.then( function(info){
//			logger.debug( info );
//		} )
//		.catch( function(err){
//			logger.error( err );
//		} );
		
		
//		req.session.regenerate( function(err){
//			logger.error( err );
//		} );
		
//		req.session.userName = "inodient";
		
//		logger.debug( "1", req.session.userName );
//		
//		req.session.save( function(err){
////			logger.error( err );
//			resolve( setModel(req, res) );
//		} );
		
//		logger.debug( "3", req.session.userName );
		
		
//		req.session.cookie.http = false;
		
		
//		req.session.destroy( function(err){
////			connHandler.clearCookie( "connect.sid", function( status, err ){
////				if( err ) logger.error( err );
////				logger.debug( status );
////				resolve( setModel(req, res) );
////			} );
////			logger.error( err );
//		} );
		
//		logger.debug( req.session.id );
		
		
		
//		console.log( req.session );
////		req.session.regenerate( function(err){
////			logger.error( err );
////		});
////		
////		req.session.destroy( function(err){
////			logger.error( err );
////		});
//		
//		req.session.cookie.expires = new Date(Date.now() + 3600000);
//		
//		req.session.views = 1;
//		
//		logger.debug( req.session.views );
//		logger.debug( req.session.id );
//		logger.debug( req.session.cookie );
////		req.session.cookie.path = "/setCookie"
//		logger.debug( req.session.cookie.path );
//		logger.debug( req.session.cookie.maxAge );
//		logger.debug( req.sessionID );
		
//		req.session.store.all( function(err, sessions){
//			if( err ) logger.error( err );
//			logger.debug( sessions );
//		});
		
//		req.session.destroy( function(err){
//			logger.error( err );
//		} );
		
//		req.session.reload( function(err){
//			logger.error( err );
//		} );
		
//		req.session.touch();
		
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

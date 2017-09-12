exports.control = function( req, res ){

	return new Promise( function(resolve, reject){
		var connHandler = new connectionHandler.body();
		
//		connHandler.setConnectionInfo( req, res )
//		.then( connHandler.getCookie("asdf") )
//		.then( function(results){
//			console.log( "RES : ", results );
//			
//			var model = setModel( req, res, null, null );
//			resolve( model );
//		} )
//		.catch( function(err){
//			reject( err );
//		} );
		
		connHandler.setConnectionInfo( req, res );
		connHandler.getCookie()
		.then( function(results){
			console.log( "HERE" );
			logger.info( results );
		} )
		.then( connHandler.setCookie( null, "KKKK", "LLLL" ) )
		.then( function(results11){
			console.log( "HERE_02" );
			logger.info( results11 );
			resolve();
		})
		.catch( function(err){
			reject(err);
		});
	} );
	
	
//	connHandler.clearCookie( "asdf" );
	
//  if( req.query.cookieKey && req.query.cookieValue ){
//    connectionHandler.setCookie( req, res, req.query.cookieKey, req.query.cookieValue );
//  } else if( req.query.sessionKey && req.query.sessionValue ){
//    connectionHandler.setSession( req, res, req.query.sessionKey, req.query.sessionValue );
//  }
}



function setModel( req, res, results, fields ){
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
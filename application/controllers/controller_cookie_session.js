exports.control = function( req, res ){
	return new Promise( function(resolve, reject){
		var message = "";
		var connHandler = new connectionHandler( req, res );

		if( req.query.cookieKey && req.query.cookieValue ){
			var testKey = req.query.cookieKey;
			var testValue = req.query.cookieValue;

			connHandler.setCookie( req.query.cookieKey, req.query.cookieValue, function( results, err ){
				if( err ) reject( err );
				logger.debug( results );
				message = "Cookie : " + req.query.cookieKey + ", " + req.query.cookieValue;
			} );
			
			connHandler.getCookie( function(cookies){
				logger.debug( cookies );
			} );


		 } else if( req.query.sessionKey && req.query.sessionValue ){
			 connHandler.setSession( req.query.sessionKey, req.query.sessionValue );
			 connHandler.getSession( function(results, err){
				 logger.debug( results );
				 message = JSON.stringify( results, null, 4 );
				 if( err ) reject( err );
			 });
		 }

		 resolve( setModel(req, res, message) );
	} );
}




function setModel( req, res, message ){
  return new Promise( function(resolve, reject){

    var mysqlQueries = [];
    var mssqlQueries = [];

    var model = {};

    if( __mysqlHandlerUsage ){
      mysqlQueries = mysqlQueriesXML.queries.query;
    } 
    if( __mssqlHandlerUsage ){
      mssqlQueries = mssqlQueriesXML.queries.query;
    } 

    try{
      model.method = req.method;
      model.path = req._parsedUrl.pathname;;
      model.queryString = JSON.stringify( req.query, null, 4 );
      model.params = JSON.stringify( req.params, null, 4 );

      model.mysqlQueries = mysqlQueries;
      model.mssqlQueries = mssqlQueries;
      model.message = message;

      resolve( model );
    } catch( err ){
      logger.error( "controller_cookie_session.js error", err );
      reject( err );
    }
  } );
}

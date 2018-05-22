exports.control = function( req, res, connection ){

	return new Promise( function(resolve, reject){

		if( __mssqlHandlerUsage ){
			var params = [];
			var queryId = req.query.selectedMssqlQueryId;

			if( queryId === "getAccessLog" ){
				var date = new Date();
				date = ( date.toISOString() ).split("T")[0];

				params.push( {"STARTDATE":"2017-09-01"} );
				params.push( {"ENDDATE":date} );

			} else if( queryId === "insertAccessLog" ){
				params.push( { "CONNECTIONTIME": ( (new Date()).toISOString() ).substring( 0, 9) } );
				params.push( { "USERID": "inodient" } );
				params.push( { "FULLPATH": req._parsedUrl.pathname } );
				params.push( { "QUERY": JSON.stringify( req.query, null, 4 ) } );
				params.push( { "PARAM": JSON.stringify( req.params, null, 4 ) } );
				params.push( { "METHOD": req.method } );
			} else if( queryId === "updateAccessLog" ){
				params.push( { "USERID": "summer-mvc" } );
				params.push( { "PARAM": "inodient" } );
			} else if( queryId === "deleteAccessLog" ){
				params.push( { "FULLPATH": "getdata" } );
			}
			
			mssqlHandler.executeQuery( queryId, params, connection.mssqlConnection )
			.then( function( queryResults ){
				resolve( setModel( req, res, JSON.stringify(queryResults.originalResults, null, 4), null ) );
			} )
			.catch( function(err){
				reject( err );
			} );
		} else{
			resolve( setModel( req, res, "MSSQL DISABLED", null ) );
		}
	} );
}

function setModel( req, res, results, fields ){
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
      model.message = results;

      resolve( model );
    } catch( err ){
      logger.error( "controller_mssql.js error", err );
      reject( err );
    }
  } );
}
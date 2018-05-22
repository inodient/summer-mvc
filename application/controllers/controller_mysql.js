exports.control = function( req, res, connection ){

	return new Promise( function(resolve, reject){

		if( __mysqlHandlerUsage ){
			var params = [];
			var queryId = req.query.selectedMysqlQueryId;

			if( queryId === "getAccessLog" ){
				var date = new Date();
				date = ( date.toISOString() ).split("T")[0];

				params.push( {"STARTDATE":"2017-09-01"} );
				params.push( {"ENDDATE":date} );

			} else if( queryId === "insertAccessLog" ){
				params.push( ( (new Date()).toISOString() ).substring( 0, 9) );
				params.push( "inodient" );
				params.push( req._parsedUrl.pathname );
				params.push( JSON.stringify( req.query, null, 4 ) );
				params.push( JSON.stringify( req.params, null, 4 ) );
				params.push( req.method );
			} else if( queryId === "updateAccessLog" ){
				params.push( "summer-mvc" );
				params.push( "inodient" );
			} else if( queryId === "deleteAccessLog" ){
				params.push( "getdata" );
			}

			mysqlHandler.executeQuery( queryId, params, connection.mysqlConnection )
			.then( function( queryResults ){
				resolve( setModel( req, res, JSON.stringify(queryResults.results, null, 4), null ) );
			} )
			.catch( function(err){
				reject( err );
			} );
		} else{
			resolve( setModel( req, res, "MYSQL DISABLED", null ) );
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
      logger.error( "controller_mysql.js error", err );
      reject( err );
    }
  } );
}
exports.control = function( req, res, connection ){

	return new Promise( function(resolve, reject){

		var params = [];
		var queryId = req.query.selectedQueryId;

		if( queryId === "getAccessLog" ){
			// params.push( "2017-09-01", "2017-09-30" );

			params.push( {"STARTDATE":"2017-09-01"} );
			params.push( {"ENDDATE":"2017-09-30"} );

		} else if( queryId === "insertAccessLog" ){
			params.push( ( (new Date()).toISOString() ).substring( 0, 9) );
			params.push( "inodient" );
			params.push( req._parsedUrl.pathname );
			params.push( JSON.stringify( req.query, null, 4 ) );
			params.push( JSON.stringify( req.params, null, 4 ) );
			params.push( req.method );
		} else if( queryId === "updateAccessLog" ){
			params.push( "inodient" );
			params.push( "your_user_id" );
		} else if( queryId === "deleteAccessLog" ){
			params.push( "%getData%" );
		}

		

		if( queryId.indexOf( "mssql") > -1 ){
			mssqlHandler.executeQuery( queryId, params, connection.mssqlConnection )
			.then( function( queryResults ){
				// logger.debug( queryResults );
				resolve( setModel( req, res, JSON.stringify(queryResults.results, null, 4), null ) );
			} )
			.catch( function(err){
				reject( err );
			} );
		} else {
			mysqlHandler.executeQuery( queryId, params, connection.mysqlConnection )
			.then( function( queryResults ){
				logger.debug( queryResults.results );
				resolve( setModel( req, res, JSON.stringify(queryResults.results, null, 4), null ) );
			} )
			.catch( function(err){
				reject( err );
			} );
		}
	} );
}

function setModel( req, res, results, fields ){

	// var queries = require( __mysqlQueries );
    var queries = queriesXML.queries.query;
	var model = {};

	try{
		model.method = req.method;
		model.path = req._parsedUrl.pathname;
		model.queryString = JSON.stringify( req.query, null, 4 );
		model.params = JSON.stringify( req.params, null, 4 );

		model.message = results;
		model.queries = queries;

		return model;
	} catch( err ){
		throw err;
	}
}









//const pool = mysql.createPool( require( require("path").join(process.cwd(), "properties", "db.json") ) );
//
//exports.control = function( req, res ){
//
//  console.log( require("os").cpus().length );
//
//  return new Promise( function(resolve, reject){
//    getCurrentTime()
//    .then( getDBVersion )
//    .then( function( results ){
//      resolve( setModel( req, res, results, null ) );
//    } );
//  } );
//}
//
//function getCurrentTime(){
//  return new Promise( function(resolve, reject){
//     pool.query( "select NOW(), CURDATE(), CURTIME()", function( err, results, fields ){
//       console.log( results );
//       resolve( results );
//     } )
//  } );
//}
//
//function getDBVersion(){
//  return new Promise( function(resolve, reject){
//    pool.query( "select * from connectionInfo", function( err, results, fields ){
//      console.log( results );
//      resolve( results );
//    } )
//  } );
//}
//
//
//
//
//function setModel( req, res, results, fields ){
//  var model = {};
//
//  try{
//    model.method = req.method;
//    model.path = req._parsedUrl.pathname;;
//    model.postMessage = "";
//    model.queryString = JSON.stringify( req.query, null, 4 );
//    model.params = JSON.stringify( req.params, null, 4 );
//    model.controllerName = require( "path" ).basename( __filename );
//    model.controlFunction = "control";
//    model.dbRes = JSON.stringify( results[0], null, 4 );
//    model.ajaxResult = "-";
//
//    return model;
//  } catch( err ){
//    throw err;
//  }
//
//}

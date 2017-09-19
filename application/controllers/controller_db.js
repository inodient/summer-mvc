exports.control = function( req, res, connection ){

	return new Promise( function(resolve, reject){
		mysqlHandler.executeQuery( "insertAccessLog", connection )
		.then( function(queryResults){
			logger.debug( queryResults.results );
			resolve( setModel( req, res, {}, null ) );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
	
	
//	mysqlHandler.getConnection( pool )
//	.then( function(connection){
//		mysqlHandler.executeQuery( "getMysqlVersion", connection )
//		.then( function(queryResults){
//			mysqlHandler.releaseConnection( connection );
//			logger.debug( queryResults.results );
//		} );
//	} )
//	.catch( function(err){
//		logger.error( err );
//	} );

	// mysqlHandler.getConnection( pool )
	// .then( mysqlHandler.executeQuery.bind( null, "getMysqlVersion" ) )
	// .then( function(results){
	// 	logger.info( results.results );
	// } )
	// .catch( function(err){
	// 	logger.error( err );
	// } );

	// mysqlHandler.getConnection()
	// .then( mysqlHandler.executeQuery.bind( null, "getMySqlVersion" ) )
	// .then( function(results){
	// 	logger.info( results.results );
	// } )
	// .catch( function(err){
	// 	logger.error( err );
	// } );



	// mysqlHandler.executeQuery( "getMySqlVersion" )
	// .then( function(results){
	// 	logger.info( results.results );
	// } )
	// .catch( function(err){
	// 	logger.error( err );
	// } );

}

function setModel( req, res, results, fields ){
	var model = {};

	try{
		model.method = req.method;
		model.path = req._parsedUrl.pathname;
		model.postMessage = "";
		model.queryString = JSON.stringify( req.query, null, 4 );
		model.params = JSON.stringify( req.params, null, 4 );
		model.controllerName = require( "path" ).basename( __filename );
		model.controlFunction = "control";
		model.dbRes = JSON.stringify( results[0], null, 4 );
		model.ajaxResult = "-";

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

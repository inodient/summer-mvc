module.exports.getPool = getPool;
module.exports.getConnection = getConnection;
module.exports.executeSelect = executeSelect;
module.exports.executeInsert = executeInsert;
module.exports.executeUpdate = executeUpdate;
module.exports.executeDelete = executeDelete;
module.exports.end = end;





const mysql = require( "mysql" );

function getPool(){
	return new Promise( function(resolve, reject){
		try{
			resolve( mysql.createPool( require(__mysqlHandlerInfo) ) );
		} catch( err ){
			reject( err );
		}
	} );
}

function getConnection(){
	var pool;
	
	if( arguments ){
		pool = arguments[0];
	}
	
	return new Promise( function(resolve, reject){
		
		if( pool ){
			pool.getConnection( function(err, connection){
				if( err ) reject( err );
				resolve( connection );
			} );
			
		} else{
			this.getPool()
			.then( function(_pool){
				_pool.getConnection( function(err, connection){
					if( err ) reject( err );
					resolve( connection );
				} );
			} );
			
		}
		
	} );
}

function executeSelect( queryId, variables ){
	var connection;

	if( arguments[2] ){
		connection = arguments[2];
	} else{
		connection = this.getConnection();
	}
	
	return new Promise( function(resolve, reject){
		connection.query( getQueryString( queryId, variables ), function(err, results, fields){
			if( err ) reject( err );

			connection.destroy();
			resolve( results );
		} );
	} );
}

function executeInsert(){
	var connection;

	if( arguments[2] ){
		connection = arguments[2];
	} else{
		connection = this.getConnection();
	}
	
	return new Promise( function(resolve, reject){
		connection.beginTransaction( function(err){
			if( err ) reject( err );

			connection.query( getQueryString( queryId, variables ), function(err, results, fields){
				if( err ){
					return connection.rollback( function(){
						reject( err );
					} );
				}

				connection.destroy();
				resolve( results );
			} );
		} );
	} );
}

function executeUpdate(){
	return new Promise( function(resolve, reject){
		var connection;

		if( arguments[2] ){
			connection = arguments[2];
		} else{
			connection = this.getConnection();
		}

		connection.beginTransaction( function(err){
			if( err ) reject( err );

			connection.query( getQueryString( queryId, variables ), function(err, results, fields){
				if( err ){
					return connection.rollback( function(){
						reject( err );
					} );
				}

				connection.destroy();
				resolve( results );
			} );
		} );
	} );
}

function executeDelete(){
	return new Promise( function(resolve, reject){
		var connection;

		if( arguments[2] ){
			connection = arguments[2];
		} else{
			connection = this.getConnection();
		}

		connection.beginTransaction( function(err){
			if( err ) reject( err );

			connection.query( getQueryString( queryId, variables ), function(err, results, fields){
				if( err ){
					return connection.rollback( function(){
						reject( err );
					} );
				}

				connection.destroy();
				resolve( results );
			} );
		} );
	} );
}

function end( pool ){
	return new Promise( function(resolve, reject){
		pool.end();
	} );
}

function getQueryString( queryId, variables ){
	return "SELECT NOW()";
}



//exports.dbHandler = function(){
//  const mysql = require( "mysql" );
//
//  const connectionInfo = require( require("path").join(process.cwd(), "properties", "db.json") );
//  const queries = require( require("path").join(process.cwd(), "queries", "query.json") );
//
//
//
//
//  const pool = mysql.createPool( connectionInfo );
//
//  this.executeQuery = function(){
//
//    return new Promise( function(resolve, reject){
//      let queryValues = [];
//      let callback = arguments[ arguments.length - 1 ];
//
//      for( var i=1; i<arguments.length-1; i++ ){
//        queryValues.push( arguments[i] );
//      }
//
//      // let queryString = this.getQueryString( arguments[0], queryValues );
//
//      queryString = "select Version()";
//
//      pool.query( queryString, function (error, results, fields) {
//        if (error) throw error;
//        // callback( error, results, fields );
//        console.log( results );
//        resolve( results );
//      });
//    } );
//  }
//
//  this.getQueryString = function( queryId ){
//
//    let queryString = "";
//
//    for( var i=0; i<queries.length; i++ ){
//      if( queries[i].id === queryId ){
//
//        if( arguments.length > 1 ){
//          queryString = mysql.format( queries[i].queryString, arguments[1] );
//        } else{
//          queryString = queries[i].queryString;
//        }
//
//        break;
//      }
//    }
//
//    return queryString;
//  }
//}

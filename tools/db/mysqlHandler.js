module.exports.getPool = getPool;
module.exports.getConnection = getConnection;
module.exports.executeQuery = executeQuery;
module.exports.releasePool = releasePool;
module.exports.releaseConnection = releaseConnection;





const mysql = require( "mysql" );
const queries = require( __mysqlQueries );




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
	var _pool = undefined;

	if( arguments ){
		_pool = arguments[0];
	}

	return new Promise( function(resolve, reject){

		if( _pool ){
			_pool.getConnection( function(err, _connection){
				if( err ) reject( err );
				resolve( _connection );
			} );

		} else{
			getPool()
			.then( function(_pool){
				_pool.getConnection( function(err, _connection){
					if( err ) reject( err );
					resolve( _connection );
				} );
			} );
		}
	} );
}






function executeQuery( queryId ){
	var params = undefined;
	var connection = undefined;

	if( arguments[1] && typeof arguments[1] == "object" ){
		if( arguments[1] instanceof Array ){
			params = arguments[1];

			if( arguments[2] ){
				connection = arguments[2];
			}
		} else if( !(arguments[1] instanceof Array) ){
			connection = arguments[1];
		}
	}

	return new Promise( function(resolve, reject){

		if( connection ){
			executeTransaction( queryId, params, connection )
			.then( function(queryResults){
				resolve( queryResults );
			} )
			.catch( function(err){
				reject( err );
			} );
		} else{
			getConnection()
			.then( executeTransaction.bind(null, queryId, params) )
			.then( function(queryResults){
				releaseConnection( queryResults.connection );
				releasePool( queryResults.connection.config.pool );

				resolve( queryResults );
			} )
			.catch( function(err){
				reject( err );
			} );
		}
	} );
}

function executeTransaction( queryId, params, connection ){

	return new Promise( function(resolve, reject){
		try{
			connection.beginTransaction( function(err){
				if( err ){
					reject( err );
				}

				connection.query( getQueryString( queryId ), params, function(err, results, fields){

					if( err ){
						connection.rollback( function(){
							reject( err );
						} );
					}

					connection.commit( function(err){
						if( err ){
							connection.rollback( function(){
								reject( err );
							} )
						}

						resolve( { connection:connection, results:results, fields:fields } );
					});

				} );
			} );
		} catch( err ){
			reject( err );
		}
	} );
}






function releasePool( pool ){
	pool.end();
}

function releaseConnection( _connection ){
	_connection.destroy();
}

function getQueryString( queryId, params ){

	for( var i=0; i<queries.length; i++ ){
		if( queries[i].id == queryId ){
			return queries[i].queryString;
		}
	}

	return "SELECT NOW()";
}

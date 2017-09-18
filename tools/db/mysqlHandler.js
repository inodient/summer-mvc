module.exports.getPool = getPool;
module.exports.getConnection = getConnection;
module.exports.executeQuery = executeQuery;

module.exports.executeSelect = executeSelect;
module.exports.executeInsert = executeInsert;
module.exports.executeUpdate = executeUpdate;
module.exports.executeDelete = executeDelete;
module.exports.end = end;





const mysql = require( "mysql" );
const queries = require( __mysqQueries );

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
			getPool()
			.then( function(_pool){
				_pool.getConnection( function(err, connection){
					if( err ) reject( err );
					resolve( connection );
				} );
			} );
			
		}
		
	} );
}

function executeSelect( queryId, params ){
	
	var _connection = null;

	if( arguments[2] ){
		_connection = arguments[2];
	}
	
	return new Promise( function(resolve, reject){
		if( _connection ){
			_connection.query( getQueryString( queryId ), params, function(err, results, fields){
				if( err ) reject( err );

				resolve( results );
			} );
		} else{
			getConnection()
			.then( function( _connection ){
				_connection.query( getQueryString( queryId ), params, function(err, results, fields){
					if( err ) reject( err );
	
					_connection.destroy();
					resolve( results );
				} );
			} )
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
					
					logger.debug( getQueryString( queryId ) );
					
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
						
						resolve( { results:results, fields:fields } );
					});
					
				} );
			} );
		} catch( err ){
			reject( err );
		}
	} );
}

function executeQuery( queryId, params ){
	var connection = null;

	if( arguments[2] ){
		connection = arguments[2];
	}
	
	return new Promise( function(resolve, reject){
		if( connection ){
			logger.debug( "Exist Connection" );
			
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
				resolve( queryResults );
			} )
			.catch( function(err){
				reject( err );
			} );
		}
	} );
}

function executeInsert( queryId ){
	var _connection = null;

	if( arguments[2] ){
		_connection = arguments[2];
	}
	
	return new Promise( function(resolve, reject){
		if( _connection ){
			_connection.beginTransaction( function(err){
				if( err ) reject( err );

				_connection.query( getQueryString( queryId ), function(err, results, fields){
					if( err ){
						_connection.rollback( function(){
							reject( err );
						} );
					}

					_connection.commit();
					resolve( results );
					
				} );
			} );
		} else{
			getConnection()
			.then( function( _connection ){
				return new Promise( function(_resolve, _reject){
					_connection.beginTransaction( function(err){
						if( err ) reject( err );
		
						_connection.query( getQueryString( queryId ), function(err, results, fields){
							if( err ){
								_connection.rollback( function(){
									reject( err );
								} );
							}
		
							_connection.commit( function(err){
								if( err ){
									_connection.rollback( function(){
										reject( err );
									} )
								}
								
								_connection.destroy();
								_resolve( { connection:_connection, results:results, fields:fields} );
//								return results;
							});
							
						} );
					} );
				});
			})
			.then( function(test){
				logger.debug( test.results );
				resolve( test );
			});
		}
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

function commit( _connection ){
	_connection.commit();
}

function end( pool ){
	return new Promise( function(resolve, reject){
		pool.end();
	} );
}

function getQueryString( queryId, params ){
	
	for( var i=0; i<queries.length; i++ ){
		if( queries[i].id == queryId ){
			return queries[i].queryString;
		}
	}
	
	return "SELECT NOW()";
}

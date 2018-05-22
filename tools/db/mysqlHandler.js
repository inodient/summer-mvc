module.exports.getPool = getPool;
module.exports.getConnection = getConnection;
module.exports.executeQuery = executeQuery;
module.exports.releasePool = releasePool;
module.exports.releaseConnection = releaseConnection;
module.exports.getQueries = getQueries;





const mysql = require( "mysql" );
const queries = require("fs").existsSync( __mysqlQueries ) === true ? require( __mysqlQueries ) : null;





function getPool(){
	return new Promise( function(resolve, reject){
		try{
			resolve( mysql.createPool( require(__mysqlHandlerInfo) ) );
		} catch( err ){
			console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
			reject( err );
		}
	} );
}

function getConnection(){
	try {
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
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
		throw err;
	}
}






function executeQuery( queryId ){
	try {
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
				.then( function( queryResults ){
					resolve( queryResults );
				} )
				.catch( function(err){
					console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
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
					console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
					reject( err );
				} );
			}
		} );
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
		throw err;
	}
}

function executeTransaction( queryId, params, connection ){

	return new Promise( function(resolve, reject){
		try{
			connection.beginTransaction( function(err){
				if( err ){
					console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
					reject( err );
				}

				connection.query( getQueryString( queryId, params ), params, function(err, results, fields){

					if( err ){
						connection.rollback( function(){
							console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
							reject( err );
						} );
					}

					connection.commit( function(err){
						if( err ){
							connection.rollback( function(){
								console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
								reject( err );
							} )
						}

						resolve( { connection:connection, results:results, fields:fields } );
					});

				} );
			} );
		} catch( err ){
			console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
			reject( err );
		}
	} );
}






function releasePool( pool ){
	try {
		pool.end();
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
		throw err;
	}
}

function releaseConnection( _connection ){
	try {
		_connection.destroy();
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
		throw err;
	}
}

function getQueryString( queryId, params ){
	try {
		if( mysqlQueriesXML ){
			let queriesArr = mysqlQueriesXML.queries.query;

			for( var i=0; i<queriesArr.length; i++ ){
				if( queriesArr[i].$.id == queryId ){
					return setQueryParams( queriesArr[i]._, params );
				}
			}
		}
		
		if( queriesXML ){
			let queriesArr = queriesXML.queries.query;

			for( var i=0; i<queriesArr.length; i++ ){
				if( queriesArr[i].$.id == queryId ){
					return setQueryParams( queriesArr[i]._, params );
				}
			}
		}

		for( var i=0; i<queries.length; i++ ){
			if( queries[i].id == queryId ){
				return queries[i].queryString;
			}
		}

		return "SELECT NOW()";
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
		throw err;
	}
}

function setQueryParams( queryString, params ){
	try {
		if( params ){

			if( queryString.indexOf("?") > -1 ){
				for( var i=0; i<params.length; i++ ){
					if( !isNaN(parseFloat(value)) && isFinite(value) ){
						queryString = queryString.replace( "?", "" + params[i] + "" );
					} else {
						queryString = queryString.replace( "?", "'" + params[i] + "'" );
					}
				}
			} else{
				for( var i=0; i<params.length; i++ ){
					if( params[i] instanceof Object ){

						var key = Object.keys( params[i] )[0];
						var value = ( params[i] )[key];

						if( !isNaN(parseFloat(value)) && isFinite(value) ){
							queryString = queryString.replace( new RegExp("#" + key + "#", "gi"), value );
						} else {
							queryString = queryString.replace( new RegExp("#" + key + "#", "gi"), "'" + value + "'" );
						}
					}
				}
			}
		}

		return setLikeQueryParam( queryString );
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mssqlHandler.js]", err );
		throw err;
	}
}

function setLikeQueryParam( queryString ){
	try {
		var queryArray = queryString.split( /where/i );
		var prePhase = queryArray[0];
		var splitPhase = "";

		if( queryArray.length > 1 ){
			for( var j=1; j<queryArray.length; j++ ){
				var wherePhase = ( ( queryArray[j] ).trim() ).replace( /\s\s+/g, ' ' );

				if( wherePhase.length > 0 ){
					var wherePhaseArray = wherePhase.split(" ");

					for( var i=1; i<wherePhaseArray.length; i++ ){

						if( wherePhaseArray[i-1].toUpperCase() === "LIKE" ){
							var param = wherePhaseArray[i];
							param = param.replace( /'/gi, "" );
							param = "'%" + param + "%'";
							wherePhaseArray[i] = param;
						}
					}

					wherePhase = "";

					for( var i=0; i<wherePhaseArray.length; i++ ){
						wherePhase += " " + wherePhaseArray[i];
					}
				}

				splitPhase += " WHERE" + wherePhase;
			}

			queryString = prePhase + splitPhase;
		}

		return queryString;

	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mssqlHandler.js]", err );
		throw err;
	}
}




function getQueries(){
	return new Promise( function(resolve, reject){
		var mysqlHandlerInfo = require(__mysqlHandlerInfo);


		if( "queries" in mysqlHandlerInfo && mysqlHandlerInfo.queries != null ){
			var queryFiles = mysqlHandlerInfo.queries;
			var queryStrings = [];

			var promises = [];

			for( var i=0; i<queryFiles.length; i++){
				promises.push( parsingQueries(queryFiles[i]) );
			}

			Promise.all( promises )
			.then( function(){
				var argv = arguments[0];

				for( var j=0; j<argv.length; j++ ){
					queryStrings = queryStrings.concat( argv[j] );
				}

				var queries = { "queries" : {"query" : queryStrings } };
				
				resolve( queries );
			} )
			.catch( function(_err){
				console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", _err );
				reject( _err );
			} );
		} else {
			parsingQueries( __mysqlQueriesXML)
			.then( function( queryStrings ){
				resolve( { "queries" : {"query" : queryStrings } } );
			} )
			.catch( function(err){
				console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
				reject( err );
			} );
		}	
	} );
}

function parsingQueries( queryFile ){
	return new Promise( function(resolve, reject){
		var fs = require('fs'), xml2js = require('xml2js');
		var parser = new xml2js.Parser();

		if( queryFile.indexOf( process.cwd() ) < 0 ){
			queryFile = require("path").join( process.cwd(), queryFile );
		}

		fs.readFile( queryFile, function(err, data){
			if( err ){
				console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
				reject( err );
			} else {
				parser.parseString(data, function(_err, result){
					if( _err ){
						console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[mysqlHandler.js]", err );
						reject( _err );						
					}
					resolve( result.queries.query );
				} );
			}
		} );
	} );
}

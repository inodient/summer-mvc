module.exports.getPool = getPool;
module.exports.getConnection = getConnection;
module.exports.executeQuery = executeQuery;
module.exports.releasePool = releasePool;
module.exports.getQueries = getQueries;





const mssql = require( "mssql" );
const queries = require("fs").existsSync( __mssqlQueries ) === true ? require( __mssqlQueries ) : null;





function getPool(){
	return new Promise( function(resolve, reject){
		mssql.connect( require(__mssqlHandlerInfo) )
		.then( function(_pool){
			resolve( _pool );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}


function getConnection(){
	var _pool = undefined;

	if( arguments ){
		_pool = arguments[0];
	}

	return new Promise( function(resolve, reject){

		if( _pool ){
			try{
				resolve( new mssql.Request( _pool ) );
			} catch( err ){
				reject( err );
			}
		} else{
			getPool()
			.then( function(_pool){
				try{
					resolve( new mssql.Request( _pool ) );
				} catch( err ){
					reject( err );
				}
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
			connection.query( getQueryString( queryId, params ) )
			.then( function( queryResults ){
				resolve( { connection:connection, results:queryResults, rowsAffacted:queryResults.rowsAffacted } );
			} )
		} else{
			executeTransaction( queryId, params )
			.then( function(queryResults){
				releasePool( queryResults.pool );
				resolve( { connection:null, results:queryResults, rowsAffacted:queryResults.rowsAffacted } );
			} )
			.catch( function(err){
				reject( err );
			} );
		}
	} );
}

function executeTransaction( queryId, params ){
	return new Promise( function(resolve, reject){

		const _pool = new mssql.ConnectionPool( require(__mssqlHandlerInfo) );

		_pool.connect().then( function(){
			var transaction = new mssql.Transaction( _pool );

			transaction.begin( function(err){

				if( err ){
					console.log( err );
					reject( err );
				} else{
					let rolledBack = false;

					transaction.on( "rollback", function(aborted){
						rolledBack = true;
					} )

					const _request = transaction.request();

					_request.query( getQueryString( queryId, params ), function(err, result){

						if (err) {
				            if (!rolledBack) {
				                transaction.rollback(err => {
				                    if( err ){
				                    	console.log( err );
				                    	reject( err );
				                    } else{
				                    	console.log( "ROLLBACK SUCCEED" );

				                    	resolve( Object.assign( result, {"pool":_pool} ) );
				                    }
				                })
				            }
				        } else {
				            transaction.commit(err => {
				            	if( err ){
				            		console.log( err )
				            		reject( err );
				            	} else{
				            		console.log( "TRANSACTION COMMIT SUCCEED" );
				            		resolve(  Object.assign( result, {"pool":_pool} ) );
				            	}
				            })
				        }
					} )
				}
			} )
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}





function releasePool( pool ){
	pool.close();
}

function getQueryString( queryId, params ){
	if( mssqlQueriesXML ){
		let queriesArr = mssqlQueriesXML.queries.query;

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
}

function setQueryParams( queryString, params ){

	if( params ){
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

	return queryString;
}




function getQueries(){
	return new Promise( function(resolve, reject){
		var mssqlHandlerInfo = require(__mssqlHandlerInfo);


		if( "queries" in mssqlHandlerInfo && mssqlHandlerInfo.queries != null ){
			var queryFiles = mssqlHandlerInfo.queries;
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
				reject( _err );
			} );
		} else {
			parsingQueries( __mssqlQueriesXML )
			.then( function( queryStrings ){
				resolve( { "queries" : {"query" : queryStrings } } );
			} )
			.catch( function(err){
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
				reject( err );
			} else {
				parser.parseString(data, function(_err, result){
					if( _err ) reject(_err);
					resolve( result.queries.query );
				} );
			}
		} );
	} );
}
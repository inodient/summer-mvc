module.exports.parseAnnotation = parseAnnotation;
module.exports.setViewInfo = setViewInfo;
module.exports.setBodyParser = setBodyParser;
module.exports.setErrorHandler = setErrorHandler;
module.exports.setConnectionHandler = setConnectionHandler;
module.exports.setFileHandler = setFileHandler;
module.exports.setMysqlHandler = setMysqlHandler;
module.exports.setMssqlHandler = setMssqlHandler;
module.exports.setExitHandler = setExitHandler;






//***************************************************
//*** Prepare Controller - Application
//***************************************************
function parseAnnotation(){
	return new Promise( function(resolve, reject){
		if( __annotationParserUsage ){
			annotationParser = require( __annotationParser );
			annotationParser.parseComponent()
			.then( function(){
				resolve( {"message" : "Annotation Parsing Succeed"} );
			} )
			.catch( function(err){
				reject( err );
			} );
		} else{
			resolve( {"message" : "Annotation Parser doesn't set to use."} );
		}
	} );
}






//***************************************************
//** Prepare view - Application
//***************************************************
function setViewInfo( express, app ){
	return new Promise( function(resolve, reject){
		try{
			// 1. set View Engine : specific for ejs
			if( __viewEngine == "ejs" ){
				app.set( "view engine", __viewEngine );
				app.engine( "html", require(__viewEngine).renderFile );
				app.set( "views", __viewsRunningPath );
			}

			// 2. set static Folders
			for( var i=0; i<__staticFolders.length; i++ ){

				if( typeof __staticFolders[i] === "string" || __staticFolders[i] instanceof String ){
					var staticFolderPath = "";

					if( (__staticFolders[i])[0] === "/" ){
						staticFolderPath = (__staticFolders[i]).substring( 1, __staticFolders[i].length );
					} else{
						staticFolderPath = __staticFolders[i];
					}

				 	app.use( express.static(staticFolderPath) );
				} else{

					var url = __staticFolders[i].url;
					var path = __staticFolders[i].path;

					app.use( url, express.static(path) );
				}
			}

			resolve( {"message" : "Set View Engine"} );
		} catch( err ){
			reject( {"message" : "Setting View Engine Failed", "err" : err} );
		}
	} );
}





//***************************************************
//** Prepare Body Parser - Application
//***************************************************
function setBodyParser( app ){
	return new Promise( function(resolve, reject){
		try{
			app.use( require("body-parser").urlencoded({ extended : true}) );

			resolve( {"message" : "Set Body Parser"} );
		} catch( err ){
			reject( {"message" : "Setting Body Parser Failed", "err" : err} );
		}
	} );
}





//***************************************************
//** Prepare Error Handler - Tools
//***************************************************
function setErrorHandler( app ){
	return new Promise( function(resolve, reject){
		try{
			if( __errorHandlerUsage ){
				var errorHandler = require( __errorHandler );
				app.use( errorHandler.logErrors );
				app.use( errorHandler.clientErrorHandler );
				app.use( errorHandler.defaultLogHandler );

				global.errorHandler;

				resolve( {"message" : "Set Error Handler"} );
			} else{
				resolve( {"message" : "Error Handler Failed doesn't set to use."} );
			}
		} catch( err ){
			reject( {"message" : "Setting Error Handler Failed", "err" : err} );
		}
	} );
}





//***************************************************
//** Prepare Connection Handler - Tools
//***************************************************
function setConnectionHandler( app ){
	return new Promise( function(resolve, reject){
		try{
			if( __connectionHandlerUsage ){
				// set cookie parser
				app.use( require("cookie-parser")() );

				// set session parser
				var session = require( "express-session" );
				var connectionSetter = require( __connectionSetter );

				var sessionInfo = connectionSetter.getConnectionInfo( session );

				app.use( session(sessionInfo) );

				global.connectionHandler = require( __connectionHandler );

				resolve( {"message" : "Set Connection Handler"} );
			} else{
				resolve( {"message" : "Connection handler doesn't set to use."} );
			}
		} catch( err ){
			reject( {"message" : "Setting Connection Handler Failed", "err" : err} );
		}
	} );
}






//***************************************************
//** Prepare File Handler - Tools
//***************************************************
function setFileHandler(){
	return new Promise( function(resolve, reject){
		try{
			if( __fileHandlerUsage ){
				global.fileHandler = require( __fileHandler );

				resolve( {"message" : "Set File Handler"} );
			} else{
				resolve( {"message" : "File Handler doesn't set to use."} );
			}
		} catch( err ){
			reject( {"message" : "Setting File Handler Failed", "err" : err} );
		}
	} );
}





//***************************************************
//** Prepare mysql Handler - Tools
//***************************************************
function setMysqlHandler(){
	return new Promise( function(resolve, reject){
		try{
			if( __mysqlHandlerUsage ){

				global.mysqlHandler = require( __mysqlHandler );

				mysqlHandler.getPool()
				.then( function(_pool){
					global.pool = _pool;
					global.mysqlPool = _pool;

					mysqlHandler.getQueries()
					.then( function(_queries){
						global.queriesXML = _queries;
						global.mysqlQueriesXML = _queries;

						resolve( {"message" : "Set MySql Handler"} );
					} )
					.catch( function(__err){
						reject( {"message" : "Setting MySql Failed", "err" : __err} )
					} );
				} )
				.catch( function(_err){
					reject( {"message" : "Setting MySql Failed", "err" : _err} );
				} );
			} else{
				resolve( {"message" : "Mysql handler doesn't set to use."} );
			}
		} catch( err ){
			reject( {"message" : "Setting MySql Failed", "err" : err} );
		}
	} );
}




//***************************************************
//** Prepare mssql Handler - Tools
//***************************************************
function setMssqlHandler(){
	return new Promise( function(resolve, reject){
		try{
			if( __mssqlHandlerUsage ){

				global.mssqlHandler = require( __mssqlHandler );

				mssqlHandler.getPool()
				.then( function(_pool){
					global.pool = _pool;
					global.mssqlPool = _pool;

					mssqlHandler.getQueries()
					.then( function(_queries){
						global.queriesXML = _queries;
						global.mssqlQueriesXML = _queries;

						resolve( {"message" : "Set MsSql Handler"} );
					} )
					.catch( function(__err){
						reject( {"message" : "Setting MsSql Failed", "err" : __err} )
					} );
				} )
				.catch( function(_err){
					reject( {"message" : "Setting MsSql Failed", "err" : _err} );
				} );
			} else{
				resolve( {"message" : "Mssql handler doesn't set to use."} );
			}
		} catch( err ){
			reject( {"message" : "Setting MsSql Failed", "err" : err} );
		}
	} );
}






//***************************************************
//** Prepare exit Handler - Tools
//***************************************************
function setExitHandler(){
	return new Promise( function(resolve, reject){
		try{
			if( __exitHandlerUsage ){
				require( __exitHandler );

				resolve( {"message" : "Set Exit Handler"} );
			} else{
				resolve( {"message" : "Exit handler doesn't set to use."} );
			}
		} catch( err ){
			reject( {"message" : "Setting Exit Handler Failed", "err" : err} );
		}
	} );
}

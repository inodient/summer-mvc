module.exports.parseAnnotation = parseAnnotation;
module.exports.setViewInfo = setViewInfo;
module.exports.setBodyParser = setBodyParser;
module.exports.setErrorHandler = setErrorHandler;
module.exports.setConnectionHandler = setConnectionHandler;
module.exports.setFileHandler = setFileHandler;
module.exports.setMysqlHandler = setMysqlHandler;
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
			resolve( {"message" : false} );
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
				var staticFolderPath = "";

				if( (__staticFolders[i])[0] === "/" ){
					staticFolderPath = (__staticFolders[i]).substring( 1, __staticFolders[i].length );
				} else{
					staticFolderPath = __staticFolders[i];
				}

			  app.use( express.static(staticFolderPath) );
			}

			resolve( {"message" : "Set View Engine"} );
		} catch( err ){
			reject( err );
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
			reject( err );
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
				resolve( {"message" : false} );
			}
		} catch( err ){
			reject( err );
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
				resolve( {"message" : false} );
			}
		} catch( err ){
			reject( err );
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
				resolve( {"message" : false} );
			}
		} catch( err ){
			reject( err );
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
					resolve( {"message" : "Set MySql Handler"} );
				} )
				.catch( function(err){
					reject( err );
				} );
			} else{
				resolve( {"message" : false} );
			}
		} catch( err ){
			reject( err );
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
				resolve( {"message" : false} );
			}
		} catch( err ){
			reject( err );
		}
	} );
}

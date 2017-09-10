module.exports.parseAnnotation = parseAnnotation;
module.exports.setViewInfo = setViewInfo;
module.exports.setBodyParser = setBodyParser;
module.exports.setErrorHandler = setErrorHandler;
module.exports.setConnectionHandler = setConnectionHandler;
module.exports.setFileHandler = setFileHandler;
module.exports.setMysqlHandler = setMysqlHandler;




//***************************************************
//*** Prepare Controller - Application
//***************************************************
function parseAnnotation(){
	return new Promise( function(resolve, reject){
		if( __annotationParserUsage ){
			annotationParser = require( __annotationParser );
			annotationParser.parseController()
			.then( function(){
				resolve( "parseAnnotation" );
			} )
			.catch( function(err){
				reject( err );
			} );
		}
	} );
}




//***************************************************
//** Prepare view - Application
//***************************************************
function setViewInfo( express, app ){
	// 1. set View Engine : specific for ejs
	if( __viewEngine == "ejs" ){
		app.set( "view engine", __viewEngine );
		app.engine( "html", require(__viewEngine).renderFile );
		app.set( "views", __viewsRunningPath );
	}
	// 2. set static Folders
	for( var i=0; i<__staticFolders.length; i++ ){
	  app.use( express.static(__staticFolders[i]) );
	}
}





//***************************************************
//** Prepare Body Parser - Application
//***************************************************
function setBodyParser( app ){
	app.use( require("body-parser").urlencoded({ extended : true}) );
}





//***************************************************
//** Prepare Error Handler - Tools
//***************************************************
function setErrorHandler( app ){
	if( __errorHandlerUsage ){
		var errorHandler = require( __errorHandler );
		app.use( errorHandler.logErrors );
		app.use( errorHandler.clientErrorHandler );
		app.use( errorHandler.defaultLogHandler );

		global.errorHandler;
	}
}





//***************************************************
//** Prepare Connection Handler - Tools
//***************************************************
function setConnectionHandler( app ){
	if( __connectionHandlerUsage ){
		var connInfo = require( __connectionHandlerInfo );

		// set cookie parser
		app.use( require("cookie-parser")() );

		// set session parser
		connInfo.cookie.maxAge = eval(connInfo.cookie.maxAge);
		app.use( require("express-session")( connInfo ) );

		global.connectionHandler = require( __connectionHandler );
	}
}





//***************************************************
//** Prepare File Handler - Tools
//***************************************************
function setFileHandler(){
	if( __fileHandlerUsage ){
		// var fileInfo = require( __fileHandlerInfo );
		global.fileHandler = require( __fileHandler );
	}
}





//***************************************************
//** Prepare mysql Handler - Tools
//***************************************************
function setMysqlHandler(){
	if( __mysqlHandlerUsage ){
		global.mysqlHandler = require( __mysqlHandler );
	}
}

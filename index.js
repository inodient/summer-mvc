//***************************************************
//*** Extracting Nodejs mode
//***************************************************
if( process.env.NODE_ENV === "production" ){
	console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "System will be started on PRODUCTION MODE." );
} else if( process.env.NODE_ENV === "development" ){
	console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "System will be started on DEVELOPMENT MODE." );
}





//***************************************************
//*** Check Syntax Error
//***************************************************
if( process.env.NODE_ENV === "development" ){
	const syntaxValidator = require("./tools/common/syntaxValidator.js" );
	var fileList = [];

	syntaxValidator.walkSync( require("path").join( process.cwd(), "application"), fileList );
	
	if( !syntaxValidator.validation( fileList ) ){
		process.exit( 0 );
	}
}




//***************************************************
//*** Version Controlling
//***************************************************
if( require("fs").existsSync( require("path").join( process.cwd(), "node_modules", "summer-mvc", "tools", "common", "versionController.js") ) ){
	require( require("path").join( process.cwd(), "node_modules", "summer-mvc", "tools", "common", "versionController.js") ).versionUpgrade();
}





//***************************************************
//*** redefined Global Values
//***************************************************
require( "./tools/common/defined.js" );




//***************************************************
//*** Inline Core Properties
//***************************************************
global.__inlineContextDispatchingInfo = null;

exports.setInlineContextDispatchingInfo = function(){
	__inlineContextDispatchingInfo = arguments[0];
	logger.info( "Inline dispatching information loaded." );
}




//***************************************************
//*** Inline Simle Routers
//***************************************************
global.simpleGetRouters = [];
global.simplePostRouters = [];

exports.get = function( path, callback ){
	var simpleGetRouter = { "path" : path, "callback" : callback };
	simpleGetRouters.push( simpleGetRouter );
	logger.info( "Inline Router for '" + path + "' [GET] is added." );
}

exports.post = function( path, callback ){
	var simplePostRouter = { "path" : path, "callback" : callback };
	simplePostRouters.push( simplePostRouter );
	logger.info( "Inline Router for '" + path + "' [POST] is added." );
}





//***************************************************
//*** Create summer-mvc project hierarchy
//***************************************************
const initializer = require( __initializer );
initializer.initStructure();




//***************************************************
//*** Set Default Logger
//***************************************************
if( __loggerUsage ){
	global.logger = require( __logger );
	logger.initLogger();
} else{
	global.logger = require( __skippedLogger );
}





//***************************************************
//*** Call Exporess WAS
//***************************************************
const express_was = require( "./express_was.js" );

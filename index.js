//***************************************************
//*** redefined Global Values
//***************************************************
const defined = require( "./tools/common/defined.js" );




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

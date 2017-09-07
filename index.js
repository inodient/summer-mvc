// redefined Global Values
const defined = require( "./tools/common/defined.js" );

//Set Default Logger
if( __loggerUsage ){
	global.logger = require( __logger );
	logger.initLogger();
}

//Init summer-mvc structure
const initializer = require( __initializer );
initializer.initStructure();

const app = require( "./app.js" );

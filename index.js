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
}




//***************************************************
//*** Set Global Modules
//***************************************************
//global.dbHandler = require( "./common/dbHandler.js" ).dbHandler;
//global.connectionHandler = require( "./common/connection.js" ).connection;
//global.fileHandler = require( "./common/fileHandler.js" ).fileHandler;
//global.Promise = require( "bluebird" );

//global.mysql = require( "mysql" );
//global.pool = mysql.createPool( require(require("path").join(process.cwd(), "properties", "db.json") ) );



//***************************************************
//*** Call Exporess WAS
//***************************************************
const express_was = require( "./express_was.js" );

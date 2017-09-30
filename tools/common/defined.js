var path = require( "path" );
var fs = require("fs");

const architecture = require( path.join( "../../core-properties/architecture.json") );


var initInfo = null;

if( fs.existsSync( path.join( process.cwd(), "core-properties", "initializer.json") ) ){
	initInfo = require( path.join( process.cwd(), "core-properties", "initializer.json") );
} else{
	initInfo = require( path.join( "../../core-properties/initializer.json") );
}






//architecture path - start
Object.defineProperty(global, "__controllerPath", {
	get: function(){
		try{
			return architecture.application.controllers;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__servicePath", {
	get : function(){
		try{
			return architecture.application.services;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__viewsPath", {
	get : function(){
		try{
			return architecture.application.views;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__viewsRunningPath", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture.application.views ) ) ){
			return path.join( process.cwd(), architecture.application.views );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture.application.views );
		}
	}
} );

Object.defineProperty(global, "__dispatcherPath", {
	get : function(){
		try{
			return architecture.core.dispatcher;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__initializerPath", {
	get : function(){
		try{
			return architecture.core.initializer;
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__corePropertiesPath", {
	get : function(){
		try{
			return architecture[ "core-properties" ];
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__commonPath", {
	get : function(){
		try{
			return architecture.tools.common;
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__connectionPath", {
	get : function(){
		try{
			return architecture.tools.connection;
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__dbPath", {
	get : function(){
		try{
			return architecture.tools.db;
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__errorPath", {
	get : function(){
		try{
			return architecture.tools.error;
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__filePath", {
	get : function(){
		try{
			return architecture.tools.file;
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__logPath", {
	get : function(){
		try{
			return architecture.tools.log;
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__toolsPropertiesPath", {
	get : function(){
		try{
			return architecture[ "tools-properties" ];
		} catch(err){
			throw err;
		}
	}
} );


Object.defineProperty(global, "__toolsSubmodulesPath", {
	get : function(){
		try{
			return architecture[ "tools-submodules" ];
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__runningPath", {
	get : function(){
		try{
			return process.cwd();
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__staticPath", {
	get : function(){
		try{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc" );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__defaultLogFilePath", {
	get : function(){
		try{
			return path.join( process.cwd(), architecture.logs )
		} catch(err){
			throw err;
		}
	}
} );
//architecture path - end








//architecture file name - start
Object.defineProperty(global, "__initializer", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.core.initializer, "initializer.js" );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__common", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.common, "common.js" );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__annotationParser", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.common, "annotationParser.js" );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__initInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "core-properties" ], "initializer.json" ) ) ){
			return path.join( process.cwd(), architecture[ "core-properties" ], "initializer.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "core-properties" ], "initializer.json" );
		}
	}
} );

Object.defineProperty(global, "__contextDispatcher", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.core.dispatcher, "context_dispatcher.js" );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__contextDispatchingInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "core-properties" ], "context_dispatcher.json" ) ) ){
			return path.join( process.cwd(), architecture[ "core-properties" ], "context_dispatcher.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "core-properties" ], "context_dispatcher.json" );
		}
	}
} );

Object.defineProperty(global, "__mav", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.model_and_view, "model_and_view.js" );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__logger", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.log, "logger.js" );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__skippedLogger", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.log, "skippedLogger.js" );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__loggerInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-properties" ], "logger.json") ) ){
			return path.join( process.cwd(), architecture[ "tools-properties" ], "logger.json")
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-properties" ], "logger.json" );
		}
	}
} );

Object.defineProperty(global, "__errorHandler", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture.tools.error, "errorHandler.js" ) ) ){
			return path.join( process.cwd(), architecture.tools.error, "errorHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture.tools.error, "errorHandler.js" );
		}
	}
} );

Object.defineProperty(global, "__clientErrorHandler", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-submodules" ], "clientErrorHandler.js" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-submodules" ], "clientErrorHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-submodules" ], "clientErrorHandler.js" );
		}
	}
} );

Object.defineProperty(global, "__connectionHandler", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture.tools.connection, "connectionHandler.js" ) ) ){
			return path.join( process.cwd(), architecture.tools.connection, "connectionHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture.tools.connection, "connectionHandler.js" );
		}
	}
} );

Object.defineProperty(global, "__connectionHandlerInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-properties" ], "connection.json" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-properties" ], "connection.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-properties" ], "connection.json" );
		}
	}
} );

Object.defineProperty(global, "__connectionHandlerSubmodule", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-submodules" ], "connectionHandlerSubmodules.js" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-submodules" ], "connectionHandlerSubmodules.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-submodules" ], "connectionHandlerSubmodules.js" );
		}
	}
} );

Object.defineProperty(global, "__connectionSetter", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture.tools.connection, "connectionSetter.js" ) ) ){
			return path.join( process.cwd(), architecture.tools.connection, "connectionSetter.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture.tools.connection, "connectionSetter.js" );
		}
	}
} );

Object.defineProperty(global, "__fileHandler", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture.tools.file, "fileHandler.js" ) ) ){
			return path.join( process.cwd(), architecture.tools.file, "fileHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture.tools.file, "fileHandler.js" );
		}
	}
} );

Object.defineProperty(global, "__fileHandlerInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-properties" ], "file.json" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-properties" ], "file.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-properties" ], "file.json" );
		}
	}
} );

Object.defineProperty(global, "__fileSubmodule", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-submodules" ], "fileSubmodules.js" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-submodules" ], "fileSubmodules.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-submodules" ], "fileSubmodules.js" );
		}
	}
} );

Object.defineProperty(global, "__mysqlHandler", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture.tools.db, "mysqlHandler.js" ) ) ){
			return path.join( process.cwd(), architecture.tools.db, "mysqlHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture.tools.db, "mysqlHandler.js" );
		}
	}
} );

Object.defineProperty(global, "__mysqlHandlerInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-properties" ], "mysql.json" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-properties" ], "mysql.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-properties" ], "mysql.json" );
		}
	}
} );

Object.defineProperty(global, "__mysqlQueries", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-submodules" ], "db", "queries", "query.json" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-submodules" ], "db", "queries", "query.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-submodules" ], "db", "queries", "query.json" );
		}
	}
} );

Object.defineProperty(global, "__colorInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-properties" ], "color.json" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-properties" ], "color.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-properties" ], "color.json" );
		}
	}
} );

Object.defineProperty(global, "__exitHandler", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture.tools.exit, "exitHandler.js" ) ) ){
			return path.join( process.cwd(), architecture.tools.exit, "exitHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture.tools.exit, "exitHandler.js" );
		}
	}
} );

Object.defineProperty(global, "__clientExitHandler", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture[ "tools-submodules" ], "clientExitHandler.js" ) ) ){
			return path.join( process.cwd(), architecture[ "tools-submodules" ], "clientExitHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture[ "tools-submodules" ], "clientExitHandler.js" );
		}
	}
} );
// architecture file name - end




// init info - start
Object.defineProperty(global, "__loggerUsage", {
	get : function(){
		try{
			var tools = initInfo.tools;

			for( var i=0; i<tools.length; i++ ){
				if( tools[i].name == "logger" ){
					return tools[i].enable;
				}
			}

			return false;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__errorHandlerUsage", {
	get : function(){
		try{
			var tools = initInfo.tools;

			for( var i=0; i<tools.length; i++ ){
				if( tools[i].name == "errorHandler" ){
					return tools[i].enable;
				}
			}

			return false;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__connectionHandlerUsage", {
	get : function(){
		try{
			var tools = initInfo.tools;

			for( var i=0; i<tools.length; i++ ){
				if( tools[i].name == "connectionHandler" ){
					return tools[i].enable;
				}
			}

			return false;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__fileHandlerUsage", {
	get : function(){
		try{
			var tools = initInfo.tools;

			for( var i=0; i<tools.length; i++ ){
				if( tools[i].name == "fileHandler" ){
					return tools[i].enable;
				}
			}

			return false;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__mysqlHandlerUsage", {
	get : function(){
		try{
			var tools = initInfo.tools;

			for( var i=0; i<tools.length; i++ ){
				if( tools[i].name == "mysqlHandler" ){
					return tools[i].enable;
				}
			}

			return false;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__exitHandlerUsage", {
	get : function(){
		try{
			var tools = initInfo.tools;

			for( var i=0; i<tools.length; i++ ){
				if( tools[i].name == "exitHandler" ){
					return tools[i].enable;
				}
			}

			return false;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__annotationParserUsage", {
	get : function(){
		try{
			return initInfo.options[ "use_annotation" ];
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__viewEngine", {
	get : function(){
		try{
			return initInfo.views.engine;
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__staticFolders", {
	get : function(){
		try{
			return initInfo[ "static_folders" ];
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__defaultPort", {
	get : function(){
		try{
			return initInfo.port
		} catch(err){
			throw err;
		}
	}
} );
//init info - end

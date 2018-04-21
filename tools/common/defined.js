var path = require( "path" );
var fs = require("fs");





var initInfo = null;
var initToolsInfo = {};


try {
	if( process.env.NODE_ENV ){
		if( process.env.NODE_ENV === "production" ){
			if( fs.existsSync( path.join( process.cwd(), "core-properties", "initializer.json") ) ){
				initInfo = require( path.join( process.cwd(), "core-properties", "initializer.json") );
			} else{
				initInfo = require( path.join( "../../core-properties/initializer.json") );
			}
		} else if( process.env.NODE_ENV === "development" ){
			if( fs.existsSync( path.join( process.cwd(), "core-properties-dev", "initializer.json") ) ){
				initInfo = require( path.join( process.cwd(), "core-properties-dev", "initializer.json") );
			} else{
				initInfo = require( path.join( "../../core-properties-dev/initializer.json") );
			}
		}
	} else {
		if( fs.existsSync( path.join( process.cwd(), "core-properties", "initializer.json") ) ){
			initInfo = require( path.join( process.cwd(), "core-properties", "initializer.json") );
		} else{
			initInfo = require( path.join( "../../core-properties/initializer.json") );
		}
	}
} catch( err ){
	console.log( err );
	throw( err );
}





var architecture = null;

try {
	if( typeof initInfo.options.use_https != "undefined" && process.env.NODE_ENV ){
		if( process.env.NODE_ENV === "production" ){
			architecture = require( path.join( "../../core-properties/architecture.json") );
		} else if( process.env.NODE_ENV === "development" ){
			architecture = require( path.join( "../../core-properties-dev/architecture.json") );
		}
	} else {
		architecture = require( path.join( "../../core-properties/architecture.json") );
	}
} catch ( err ){
	console.log( err );
	throw( err );
}






// server options - start
Object.defineProperty(global, "__httpsUsage", {
	get: function(){
		try{
			if( typeof initInfo.options.use_https != "undefined" ){
				return initInfo.options.use_https;
			} else {
				return false;
			}
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );
// server options - end






//architecture path - start
Object.defineProperty(global, "__controllerPath", {
	get: function(){
		try{
			return architecture.application.controllers;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__servicePath", {
	get : function(){
		try{
			return architecture.application.services;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__viewsPath", {
	get : function(){
		try{
			return architecture.application.views;
		} catch(err){
			console.log( err );
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
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__initializerPath", {
	get : function(){
		try{
			return architecture.core.initializer;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__corePropertiesPath", {
	get : function(){
		try{
			return architecture[ "core-properties" ];
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__commonPath", {
	get : function(){
		try{
			return architecture.tools.common;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__connectionPath", {
	get : function(){
		try{
			return architecture.tools.connection;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__dbPath", {
	get : function(){
		try{
			return architecture.tools.db;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__errorPath", {
	get : function(){
		try{
			return architecture.tools.error;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__filePath", {
	get : function(){
		try{
			return architecture.tools.file;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__logPath", {
	get : function(){
		try{
			return architecture.tools.log;
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__toolsPropertiesPath", {
	get : function(){
		try{
			return architecture[ "tools-properties" ];
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );


Object.defineProperty(global, "__toolsSubmodulesPath", {
	get : function(){
		try{
			return architecture[ "tools-submodules" ];
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__runningPath", {
	get : function(){
		try{
			return process.cwd();
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__staticPath", {
	get : function(){
		try{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__defaultLogFilePath", {
	get : function(){
		try{
			return path.join( process.cwd(), architecture.logs )
		} catch(err){
			console.log( err );
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
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__httpsInitializer", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.core.https, "httpsInitializer.js" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__common", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.common, "common.js" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__versionController", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.common, "versionController.js" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__annotationParser", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.common, "annotationParser.js" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__initInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __corePropertiesPath, "initializer.json" ) ) ){
			return path.join( process.cwd(), __corePropertiesPath, "initializer.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __corePropertiesPath, "initializer.json" );
		}
	}
} );

Object.defineProperty(global, "__contextDispatcher", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.core.dispatcher, "context_dispatcher.js" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__contextDispatchingInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __corePropertiesPath, "context_dispatcher.json" ) ) ){
			return path.join( process.cwd(), __corePropertiesPath, "context_dispatcher.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __corePropertiesPath, "context_dispatcher.json" );
		}
	}
} );

Object.defineProperty(global, "__mav", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.model_and_view, "model_and_view.js" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__logger", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.log, "logger.js" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__skippedLogger", {
	get : function(){
		try{
			return path.join( __dirname, "../../", architecture.tools.log, "skippedLogger.js" );
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__loggerInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __toolsPropertiesPath, "logger.json") ) ){
			return path.join( process.cwd(), __toolsPropertiesPath, "logger.json")
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsPropertiesPath, "logger.json" );
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
		if( fs.existsSync(path.join( process.cwd(), __toolsSubmodulesPath, "clientErrorHandler.js" ) ) ){
			return path.join( process.cwd(), __toolsSubmodulesPath, "clientErrorHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsSubmodulesPath, "clientErrorHandler.js" );
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
		if( fs.existsSync(path.join( process.cwd(), __toolsPropertiesPath, "connection.json" ) ) ){
			return path.join( process.cwd(), __toolsPropertiesPath, "connection.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsPropertiesPath, "connection.json" );
		}
	}
} );

Object.defineProperty(global, "__connectionHandlerSubmodule", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __toolsSubmodulesPath, "connectionHandlerSubmodules.js" ) ) ){
			return path.join( process.cwd(), __toolsSubmodulesPath, "connectionHandlerSubmodules.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsSubmodulesPath, "connectionHandlerSubmodules.js" );
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
		if( fs.existsSync(path.join( process.cwd(), __toolsPropertiesPath, "file.json" ) ) ){
			return path.join( process.cwd(), __toolsPropertiesPath, "file.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsPropertiesPath, "file.json" );
		}
	}
} );

Object.defineProperty(global, "__fileSubmodule", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __toolsSubmodulesPath, "fileSubmodules.js" ) ) ){
			return path.join( process.cwd(), __toolsSubmodulesPath, "fileSubmodules.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsSubmodulesPath, "fileSubmodules.js" );
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
		if( fs.existsSync(path.join( process.cwd(), __toolsPropertiesPath, "mysql.json" ) ) ){
			return path.join( process.cwd(), __toolsPropertiesPath, "mysql.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsPropertiesPath, "mysql.json" );
		}
	}
} );

Object.defineProperty(global, "__mysqlQueries", {
	get : function(){
		console.log( "\x1b[31m%s\x1b[0m", "[warning]", "__mysqlQueries Usage : JSON type query files are deprecated. Use xml file type. Sample xml can be found in '/tools-submodules/db/queries.'" );

		if( fs.existsSync(path.join( process.cwd(), __toolsSubmodulesPath, "db", "queries", "query.json" ) ) ){
			return path.join( process.cwd(), __toolsSubmodulesPath, "db", "queries", "query.json" );
		} else {
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsSubmodulesPath, "db", "queries", "query.json" );
		}
	}
} );

Object.defineProperty(global, "__mysqlQueriesXML", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __toolsSubmodulesPath, "db", "queries", "query.xml" ) ) ){
			return path.join( process.cwd(), __toolsSubmodulesPath, "db", "queries", "query.xml" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsSubmodulesPath, "db", "queries", "query.xml" );
		}
	}
} );

Object.defineProperty(global, "__mssqlHandler", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), architecture.tools.db, "mssqlHandler.js" ) ) ){
			return path.join( process.cwd(), architecture.tools.db, "mssqlHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", architecture.tools.db, "mssqlHandler.js" );
		}
	}
} );

Object.defineProperty(global, "__mssqlHandlerInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __toolsPropertiesPath, "mssql.json" ) ) ){
			return path.join( process.cwd(), __toolsPropertiesPath, "mssql.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsPropertiesPath, "mssql.json" );
		}
	}
} );

Object.defineProperty(global, "__mssqlQueries", {
	get : function(){
		console.log( "\x1b[31m%s\x1b[0m", "[warning]", "__mssqlQueries Usage : JSON type query files are deprecated. Use xml file type. Sample xml can be found in '/tools-submodules/db/queries.'" );

		if( fs.existsSync(path.join( process.cwd(), __toolsSubmodulesPath, "db", "queries", "query.json" ) ) ){
			return path.join( process.cwd(), __toolsSubmodulesPath, "db", "queries", "query.json" );
		} else {
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsSubmodulesPath, "db", "queries", "query.json" );
		}
	}
} );

Object.defineProperty(global, "__mssqlQueriesXML", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __toolsSubmodulesPath, "db", "queries", "query.xml" ) ) ){
			return path.join( process.cwd(), __toolsSubmodulesPath, "db", "queries", "query.xml" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsSubmodulesPath, "db", "queries", "query.xml" );
		}
	}
} );

Object.defineProperty(global, "__colorInfo", {
	get : function(){
		if( fs.existsSync(path.join( process.cwd(), __toolsPropertiesPath, "color.json" ) ) ){
			return path.join( process.cwd(), __toolsPropertiesPath, "color.json" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsPropertiesPath, "color.json" );
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
		if( fs.existsSync(path.join( process.cwd(), __toolsSubmodulesPath, "clientExitHandler.js" ) ) ){
			return path.join( process.cwd(), __toolsSubmodulesPath, "clientExitHandler.js" );
		} else{
			return path.join( path.dirname( require.main.filename ), "node_modules", "summer-mvc", __toolsSubmodulesPath, "clientExitHandler.js" );
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
			console.log( err );
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
			console.log( err );
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
			console.log( err );
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
			console.log( err );
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
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__mssqlHandlerUsage", {
	get : function(){
		try{
			var tools = initInfo.tools;

			for( var i=0; i<tools.length; i++ ){
				if( tools[i].name == "mssqlHandler" ){
					return tools[i].enable;
				}
			}

			return false;
		} catch(err){
			console.log( err );
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
			console.log( err );
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
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__staticFolders", {
	get : function(){
		try{
			return initInfo[ "static_folders" ];
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__defaultPort", {
	get : function(){
		try{
			if( typeof initInfo.protocol != "undefined" && typeof initInfo.protocol.http != "undefined" ){
				return initInfo.protocol.http.port;
			} else {
				return initInfo.port
			}
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__defaultHttpsPort", {
	get : function(){
		try{
			if( typeof initInfo.protocol != "undefined" ){
				return initInfo.protocol.https.port;
			}
		} catch(err){
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__httpsCertificationsPath", {
	get : function(){
		try{
			if( typeof initInfo.protocol != "undefined" ){
				return initInfo.protocol.https.certification_path;
			}
		} catch(err){
			console.log( "Default Https Certifications are empty." );
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__httpsKeyFilePath", {
	get : function(){
		try{
			if( typeof initInfo.protocol != "undefined" ){
				var keyFileName = initInfo.protocol.https.keyFileName;

				if( fs.existsSync( path.join( process.cwd(), __corePropertiesPath, "https", keyFileName) ) ){
					return path.join( process.cwd(), __corePropertiesPath, "https", keyFileName);
				} else{
					return path.join( "../../core-properties/" + keyFileName);
				}
			}
		} catch(err){
			console.log( "Default Https Certification (keyFile) is empty." );
			console.log( err );
			throw err;
		}
	}
} );

Object.defineProperty(global, "__httpsCertFilePath", {
	get : function(){
		try{
			if( typeof initInfo.protocol != "undefined" ){
				var certFileName = initInfo.protocol.https.certFileName;

				if( fs.existsSync( path.join( process.cwd(), __corePropertiesPath, "https", certFileName) ) ){
					return path.join( process.cwd(), __corePropertiesPath, "https", certFileName);
				} else{
					return path.join( "../../core-properties/" + certFileName);
				}
			}
		} catch(err){
			console.log( "Default Https Certification (certFile) is empty." );
			console.log( err );
			throw err;
		}
	}
} );
//init info - end

const architecture = require( require("path").join( "../../core-properties/architecture.json") );
var path = require( "path" );

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
		try{
			return path.join( process.cwd(), architecture.application.views );
		} catch(err){
			throw err;
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
			return path.dirname( require.main.filename );
		} catch(err){
			throw err;
		}
	}
} );

Object.defineProperty(global, "__loggerInfo", {
	get : function(){
		try{
			return path.join( process.cwd(), architecture[ "tools-properties" ], "logger.json" );
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

Object.defineProperty(global, "__initInfo", {
	get : function(){
		try{
			return path.join( process.cwd(), architecture[ "core-properties" ], "initializer.json" );
		} catch(err){
			throw err;
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
		try{
			return path.join( process.cwd(), architecture[ "core-properties" ], "context_dispatcher.json" );
		} catch(err){
			throw err;
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

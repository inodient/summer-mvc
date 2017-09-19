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
			annotationParser.parseComponent()
			.then( function(){
				resolve( {"message" : "Annotation Parsing Succeed"} );
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
			  app.use( express.static(__staticFolders[i]) );
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
			}

			resolve( {"message" : "Set Error Handler"} );
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
				var connInfo = require( __connectionHandlerInfo );
				connInfo.cookie.maxAge = eval(connInfo.cookie.maxAge);
				
//				var redisInfo = require( __redisInfo );
				
				var session = require( "express-session" );
				var RedisStore = require( "connect-redis" )(session);
				var redis = require( "redis" );
				var client = redis.createClient();
				
				var options = {};
				
				options.client = client;
				options.host = "127.0.0.1";
				options.port = "6379";
				options.prefix = "session";
//				options.db = 0;
				
				var _RedisStore = new RedisStore( options );
				
				var test = {
//					"store" : _RedisStore,
					"genid" : genuuid,
					"name" : "SESSION NAME",
					"secret" : "a;slkjf;alkjsd;foiqnw;jbnf;kajbsd;kfjasdh",
					"resave" : false, // don't save session if unmodified
					"saveUninitialized" : true, // don't create session until something stored,
					"cookie" : {
						"httpOnly" : true,
						"maxAge" : 3600000,
						"secure" : false
					}
				}
				
				app.use( session( test ) );

				global.connectionHandler = require( __connectionHandler );
			}

			resolve( {"message" : "Set Connection Handler"} );
		} catch( err ){
			reject( err );
		}
	} );
}

function regenerateSessionInfo( connInfo, options, RedisStore ){
	var sessionOption = {
			store : new RedisStore( options ),
			genid : genuuid,
			name : "SESSIONNAME"
	};
	
	for( name in connInfo ){
		sessionOption[ name ] = connInfo[name];
	}
	
	logger.debug( sessionOption );
	
	return sessionOption;
}

function getRedisStore( RedisStore, options ){
	options = {};
	
	options.host = "localhost";
	options.port = "6379";
	
	
	return new RedisStore( options );
}

function genuuid(req){
	
	if( req.query.cookieKey ){
		return req.query.cookieKey;
	} else{
		return "test session id";
	}
	
	return "TESTSESSIONUUID";
}





//***************************************************
//** Prepare File Handler - Tools
//***************************************************
function setFileHandler(){
	return new Promise( function(resolve, reject){
		try{
			if( __fileHandlerUsage ){
				global.fileHandler = require( __fileHandler );
			}

			resolve( {"message" : "Set File Handler"} );
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
				} );
			}
		} catch( err ){
			reject( err );
		}
	} );
}

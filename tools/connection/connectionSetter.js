module.exports.getConnectionInfo = getConnectionInfo;




function getConnectionInfo( session ){
	try {
		var connInfo = require( __connectionHandlerInfo );

		var redis = null;
		var idGenerator = null;
		var sessionName = null;

		if( connInfo[ "session-setting" ][ "enable-redis-store" ] ){
			redis = getRedisStore( session, connInfo[ "redis-info" ] );
		}
		if( connInfo[ "session-setting" ][ "enable-custom-id-generator" ] ){
			idGenerator =  getIdGenerator();
		}
		if( connInfo[ "session-setting" ][ "enable-custom-name" ] ){
			sessionName = getSessionName();
		}

		var sessionInfo = {};
		if( connInfo[ "session-info" ] ){
			sessionInfo = connInfo[ "session-info" ];
			sessionInfo.cookie.maxAge = eval(sessionInfo.cookie.maxAge);
		}


		sessionInfo = generateSessionInfo( sessionInfo, redis, idGenerator, sessionName );

		return sessionInfo;
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[connectionSetter.js]", err );
		throw err;
	}
}




function generateSessionInfo( sessionInfo, redis, idGenerator, sessionName ){
	try {
		if( redis ){
			sessionInfo.store = redis;
		}
		if( idGenerator ){
			sessionInfo.genid = idGenerator;
		}
		if( sessionName ){
			sessionInfo.name = sessionName;
		}

		return sessionInfo;
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[connectionSetter.js]", err );
		throw err;
	}
}

function getRedisStore( session, options ){
	try {
		var redisStore = require( "connect-redis" )(session);
		var redis = require( "redis" );

		var client = redis.createClient();

		options.client = client;

		return new redisStore( options );
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[connectionSetter.js]", err );
		throw err;
	}
}

function getIdGenerator(){
	try {
		var submodules = require( __connectionHandlerSubmodule );

		return submodules.genUuid;
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[connectionSetter.js]", err );
		throw err;
	}
}

function getSessionName(){
	try {
		var submodules = require( __connectionHandlerSubmodule );

		return submodules.genName();
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[connectionSetter.js]", err );
		throw err;
	}
}

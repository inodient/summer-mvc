module.exports.getConnectionInfo = getConnectionInfo;




function getConnectionInfo( session ){
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
}




function generateSessionInfo( sessionInfo, redis, idGenerator, sessionName ){
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
}

function getRedisStore( session, options ){
	var redisStore = require( "connect-redis" )(session);
	var redis = require( "redis" );

	var client = redis.createClient();

	options.client = client;

	return new redisStore( options );
}

function getIdGenerator(){
	var submodules = require( __connectionHandlerSubmodule );

	return submodules.genUuid;
}

function getSessionName(){
	var submodules = require( __connectionHandlerSubmodule );

	return submodules.genName();
}

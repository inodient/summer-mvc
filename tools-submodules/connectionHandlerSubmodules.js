module.exports.genUuid = genUuid;
module.exports.genName = genName;





function genUuid( req ){
	
//	if( req.query.cookieKey ){
//		return req.query.cookieKey;
//	} else{
//		return "test session id";
//	}
	
//	return "TEST_SESSION_UUID";
	return new Date();
}

function genName(){
	
//	if( req.query.cookieKey ){
//		return req.query.cookieKey;
//	} else{
//		return "test session id";
//	}
	
	return "TEST_NAME";
}

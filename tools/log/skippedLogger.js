module.exports.info = info;
module.exports.debug = debug;
module.exports.error = error;





function info(){

	try {
		var message = "";

		for( var i=0; i<arguments.length; i++ ){
			if( getMessageType(arguments[i]) == "object" ){
				try{
					message += JSON.stringify( arguments[i], null, 4 ) + " ";
				} catch( err ){
					var argv = arguments[i];
					argv = util.inspect( arguments[i], {showHidden: false, depth: null} );
					message += argv + " ";
				}
			} else{
				message += arguments[i] + " ";
			}
		}

		console.log( message );
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[skippedLogger.js]", err );
		throw err;
	}
}

function debug(){

	try {
		var message = "";

		for( var i=0; i<arguments.length; i++ ){
			if( getMessageType(arguments[i]) == "object" ){
				try{
					message += JSON.stringify( arguments[i], null, 4 ) + " ";
				} catch( err ){
					var argv = arguments[i];
					argv = util.inspect( arguments[i], {showHidden: false, depth: null} );
					message += argv + " ";
				}
			} else{
				message += arguments[i] + " ";
			}
		}

		console.log( message );
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[skippedLogger.js]", err );
		throw err;
	}
}

function error(){

	try {
		var message = "";

		for( var i=0; i<arguments.length; i++ ){
			if( arguments[i] instanceof Error ){
				message += arguments[i].message + "\n" + arguments[i].stack;
			} else{
				if( getMessageType(arguments[i]) == "object" ){
					try{
						message += JSON.stringify( arguments[i], null, 4 ) + " ";
					} catch( err ){
						var argv = arguments[i];
						argv = util.inspect( arguments[i], {showHidden: false, depth: null} );
						message += argv + " ";
					}
				} else{
					message += arguments[i] + " ";
				}
			}
		}

		console.error( message );
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[skippedLogger.js]", err );
		throw err;
	}
}




function getMessageType( message ){

	try {
		return typeof message;
	} catch( err ){
		console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[skippedLogger.js]", err );
		throw err;
	}
}
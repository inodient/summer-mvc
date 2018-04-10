module.exports.initLogger = initLogger;
module.exports.log = log;
module.exports.info = info;
module.exports.debug = debug;
module.exports.error = error;





var fs = require( "fs" );
var path = require( "path" );
var util = require( "util" );
var loggerInfo = require( __loggerInfo );
var colorInfo = require( __colorInfo );





// Initializing Logger - Start
function initLogger(){
	let destination = createLogFile();
	global.logFileWriteStream = createStream( destination );
}

function createLogFile(){
	let filePath = loggerInfo.file.path == "__defaultLogFilePath" ? __defaultLogFilePath : loggerInfo.file.path;
	let fileNamePrefix = loggerInfo.file.fileNamePrefix;
	let fileName = getLogFileName( fileNamePrefix );

	var common = require( __common );
	common.makeHierarchy( filePath, "/" );

	let destination = path.join(filePath, fileName);

	try{
		fs.openSync( destination, "a" );
		return destination;
	} catch( err ){
		throw err;
	}
}

function getLogFileName( fileName ){
	let date = ( ( new Date() ).toISOString() ).substring( 0, 10 );
	fileName = fileName + "_" + date + ".log";

	return fileName;
}

function createStream( destination ){
	return fs.createWriteStream( destination, {flags: "a", "encoding" : "utf8", "mode" : 0666} );
}
// Initializing Logger - End




// Write Log - Start
function log( type, message ){
	var curTime = new Date();
	curTime = curTime.toISOString();

	var functionName = getFunctionName( arguments.callee.caller.toString() );

	logFileWriteStream.write( "[" + type + "] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "\n"  );
	console.log( "[" + type + "] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + ""  );
}

function info(){
	var curTime = new Date();
	curTime = curTime.toISOString();

	var message = "";

	for( var i=0; i<arguments.length; i++ ){
		if( getMessageType(arguments[i]) == "object" ){
			
			try{
				if( JSON.stringify( arguments[i], null, 4 ) === "{}" ){
					message += require("util").inspect(arguments[i], {showHidden: false, depth: null} );
				} else {
					message += JSON.stringify( arguments[i], null, 4 ) + " ";
				}
			} catch( err ){
				var argv = arguments[i];
				argv = util.inspect( arguments[i], {showHidden: false, depth: null} );
				message += argv + " ";
			}
		} else{
			message += arguments[i] + " ";
		}
	}

	var functionName = ( getFunctionName( arguments.callee.caller.toString() ) ).trim();

	if( loggerInfo.writeFile.INFO ){
		logFileWriteStream.write( "[INFO] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "\n"  );
	}
	if( loggerInfo.console.INFO ){
		console.log( attachColorPrefix(colorInfo.FgYellow) + "%s" + attachColorPrefix(colorInfo.Reset), "[INFO]", "[" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "", ""  );
	}
}

function debug(){
	var curTime = new Date();
	curTime = curTime.toISOString();

	var message = "";

	for( var i=0; i<arguments.length; i++ ){

		if( getMessageType(arguments[i]) == "object" ){

			try{
				if( JSON.stringify( arguments[i], null, 4 ) === "{}" ){
					message += require("util").inspect(arguments[i], {showHidden: false, depth: null} );
				} else {
					message += JSON.stringify( arguments[i], null, 4 ) + " ";
				}
			} catch( err ){
				var argv = arguments[i];
				argv = util.inspect( arguments[i], {showHidden: false, depth: null} );
				message += argv + " ";
			}
		} else{
			message += arguments[i] + " ";
		}
	}

	var functionName = getFunctionName( arguments.callee.caller.toString() );

	if( loggerInfo.writeFile.INFO ){
		logFileWriteStream.write( "[DEBUG] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "\n"  );
	}
	if( loggerInfo.console.INFO ){
		console.log( attachColorPrefix(colorInfo.FgCyan) + "%s" +  attachColorPrefix(colorInfo.Reset), "[DEBUG]", "[" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + ""  );
	}
}

function error(){
	var curTime = new Date();
	curTime = curTime.toISOString();

	var functionName = getFunctionName( arguments.callee.caller.toString() );

	var message = "";

	for( var i=0; i<arguments.length; i++ ){
		if( arguments[i] instanceof Error ){
			message += arguments[i].message + "\n" + arguments[i].stack;
		} else{
			if( getMessageType(arguments[i]) == "object" ){
				try{
					if( JSON.stringify( arguments[i], null, 4 ) === "{}" ){
						message += require("util").inspect(arguments[i], {showHidden: false, depth: null} );
					} else {
						message += JSON.stringify( arguments[i], null, 4 ) + " ";
					}
				} catch( err ){
					var argv = arguments[i];
					argv = util.inspect( arguments[i], {showHidden: false, depth: null} );
					message += argv + " ";
				}
			} else{
				var tempMessage = arguments[i];
				var tempMessageArray = tempMessage.split("\n");

				message += tempMessageArray[0] + "\n";
				message += tempMessageArray[1] + "\n";

				for( var j=2; j<tempMessageArray.length; j++ ){
					var line = tempMessageArray[j];
					var lineArray = line.split(",");

					for( var k=0; k<lineArray.length; k++ ){
						message += "	" + lineArray[k] + "\n";
					}
				}
			}
		}
	}

	if( loggerInfo.writeFile.ERROR ){
		logFileWriteStream.write( "[ERROR] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "\n"  );
	}
	if( loggerInfo.console.ERROR ){
		console.log(  attachColorPrefix(colorInfo.FgRed) + "%s" +  attachColorPrefix(colorInfo.Reset), "[ERROR]", "[" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + ""  );
	}
}
// Write Log - End




// Helper Functions - Start
function getFunctionName( func ){
  func = func.substr('function '.length);
  func = func.substr(0, func.indexOf('('));

	if( func == "" ) func = "ANONYMOUS_FUNC";
	if( func.indexOf( "=>" ) >= 0 ) func = "ANONYMOUS_FUNC";

	return func;
}

function getMessageType( message ){
	return typeof message;
}

function attachColorPrefix( colorValue ){
	return "\x1b" + colorValue;
}

Object.defineProperty(global, '__callerFileName', {
	get: function(){
		try {
			var err = new Error();
			var callerfile;
			var currentfile;

			Error.prepareStackTrace = function (err, stack) { return stack; };

			currentfile = err.stack.shift().getFileName();

			while (err.stack.length) {
			    callerfile = err.stack.shift().getFileName();
			    if(currentfile !== callerfile){
			    	return callerfile.replace( path.dirname(require.main.filename), "" );
			    }
			}
		} catch (err) {}
			return undefined;
		}
});

Object.defineProperty(global, '__stack', {
	get: function(){
		var orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack){ return stack; };

		var err = new Error;
		Error.captureStackTrace(err, arguments.callee.caller);

		var stack = err.stack;
		Error.prepareStackTrace = orig;

		return stack;
	}
});

Object.defineProperty(global, '__line', {
	get: function(){
		return __stack[1].getLineNumber();
	}
});
// Helper Functions - End

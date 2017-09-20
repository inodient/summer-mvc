module.exports.initLogger = initLogger;
module.exports.log = log;
module.exports.info = info;
module.exports.debug = debug;
module.exports.error = error;




const fs = require( "fs" );
const path = require( "path" );
const loggerInfo = require( __loggerInfo );
const colorInfo = require( __colorInfo );
var stream = null;




// Initializing Logger - Start
function initLogger(){
	let destination = createLogFile();
	stream = createStream( destination );
}

function createLogFile(){
	let filePath = loggerInfo.file.path == "__defaultLogFilePath" ? __defaultLogFilePath : loggerInfo.file.path;
	let fileNamePrefix = loggerInfo.file.fileNamePrefix;
	let fileName = getLogFileName( fileNamePrefix );

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

	stream.write( "[" + type + "] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "\n"  );
	console.log( "[" + type + "] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + ""  );
}

function info(){
	var curTime = new Date();
	curTime = curTime.toISOString();

	var message = "";

	for( var i=0; i<arguments.length; i++ ){
		if( getMessageType(arguments[i]) == "object" ){
			var argv = arguments[i];
			message += JSON.stringify( arguments[i], null, 4 ) + " ";
			// for( name in argv ){
			// 	message += argv[name];
			// }
		} else{
			message += arguments[i] + " ";
		}
	}

	var functionName = getFunctionName( arguments.callee.caller.toString() );

	if( loggerInfo.writeFile.INFO ){
		stream.write( "[INFO] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "\n"  );
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
			message += JSON.stringify( arguments[i], null, 4 ) + " ";
		} else{
			message += arguments[i] + " ";
		}
	}

	var functionName = getFunctionName( arguments.callee.caller.toString() );

	if( loggerInfo.writeFile.INFO ){
		stream.write( "[DEBUG] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "\n"  );
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
			// message = String( arguments[i] );

			if( getMessageType(arguments[i]) == "object" ){
				message += JSON.stringify( arguments[i], null, 4 ) + " ";
			} else{
				message += arguments[i] + " ";
			}
		}
	}

	if( loggerInfo.writeFile.ERROR ){
		stream.write( "[ERROR] - [" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + "\n"  );
	}
	if( loggerInfo.console.ERROR ){
		console.log(  attachColorPrefix(colorInfo.FgRed) + "%s" +  attachColorPrefix(colorInfo.Reset), "[ERROR]", "[" + __callerFileName + " : " + __line + " | " + functionName + " - " + curTime + "] " + message + ""  );
	}
}
// Write Log - End




// Exit control - start
process.stdin.resume();//so the program will not close instantly
process.on('exit', exitHandler.bind(null,{cleanup:true})); //do something when app is closing
process.on('SIGINT', exitHandler.bind(null, {exit:true})); //catches ctrl+c event
process.on('uncaughtException', exitHandler.bind(null, {exit:true})); //catches uncaught exceptions
// Exit control - end




// Helper Functions - Start
function exitHandler(options, err) {
	stream.end();

	if (options.cleanup) console.log('clean');
	if (err) console.log(err.stack);
	if (options.exit) process.exit();
}

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

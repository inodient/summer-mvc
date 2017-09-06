const Reset = "\x1b[0m"
const Bright = "\x1b[1m"
const Dim = "\x1b[2m"
const Underscore = "\x1b[4m"
const Blink = "\x1b[5m"
const Reverse = "\x1b[7m"
const Hidden = "\x1b[8m"

const FgBlack = "\x1b[30m"
const FgRed = "\x1b[31m"
const FgGreen = "\x1b[32m"
const FgYellow = "\x1b[33m"
const FgBlue = "\x1b[34m"
const FgMagenta = "\x1b[35m"
const FgCyan = "\x1b[36m"
const FgWhite = "\x1b[37m"

const BgBlack = "\x1b[40m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"
const BgWhite = "\x1b[47m"
//
//
//
module.exports.initLogger = initLogger;
//module.exports.setLevel = setLevel;
module.exports.log = log;
////module.exports = error;
////module.exports = info;
////module.exports = debug;
//
//
/////////////////////////////////////////////////////////////////////
//// exit control - start
//process.stdin.resume();//so the program will not close instantly
//
//function exitHandler(options, err) {
//	console.log( "TERMINATED...." );
//
//	stream.end();
//
//    if (options.cleanup) console.log('clean');
//    if (err) console.log(err.stack);
//    if (options.exit) process.exit();
//}
//
////do something when app is closing
//process.on('exit', exitHandler.bind(null,{cleanup:true}));
//
////catches ctrl+c event
//process.on('SIGINT', exitHandler.bind(null, {exit:true}));
//
////catches uncaught exceptions
//process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
//// exit control - end
/////////////////////////////////////////////////////////////////////
//
//
//
//
//
//
//
//
/////////////////////////////////////////////////////////////////////
// read controller - start
const fs = require( "fs" );
const path = require( "path" );
var stream = null;

function log(){
	stream.write( "test......", () => {
		console.log( "WRITTEN!!" );
	});
}


function initLogger(){
	createLogFile();
	stream = createStream();
}


function createLogFile(){
	var common = require( __common );
	common.createAndOpenFile( __defaultLogFilePath, getLogFileName() );
}


function getLogFileName(){
	let date = ( ( new Date() ).toISOString() ).substring( 0, 10 );
	let fileName = date + ".log";
	
	return fileName;
}

function createStream(){
	return fs.createWriteStream( path.join( __defaultLogFilePath, getLogFileName() ) );
}



//// fs.readFile( require("path").join( process.cwd(), "controller", "controller_basic.js" ), "utf8", function(err, data){
//// 	console.log( data );
//// } );
//
//// readline = require("readline");
//// var rd = readline.createInterface({
////     input: fs.createReadStream(require("path").join( process.cwd(), "controller", "controller_basic.js" )),
////     // output: process.stdout,
////     console: false
//// });
////
//// rd.on('line', function(line) {
//// 	con
////
//// 	if( line.indexOf( "*" ) == 0 ){
//// 		console.log(line);
//// 	}
////
//// });
//
//function readLines(input, func) {
//  var remaining = '';
//
//  input.on('data', function(data) {
//    remaining += data;
//    var index = remaining.indexOf('\n');
//    while (index > -1) {
//      var line = remaining.substring(0, index);
//      remaining = remaining.substring(index + 1);
//      func(line);
//      index = remaining.indexOf('\n');
//    }
//  });
//
//  input.on('end', function() {
//    if (remaining.length > 0) {
//      func(remaining);
//    }
//  });
//}
//
//function func(data) {
//  console.log('Line: ' + data);
//}
//
//var input = fs.createReadStream(require("path").join( process.cwd(), "controller", "controller_basic.js" ));
//readLines(input, func);
//
//// read controller - end
/////////////////////////////////////////////////////////////////////
//
//
//
//
//function initLogger( filePath, sepearteTerm ){
//
//	console.log( getFunctionName( arguments.callee.caller.toString() ) );
//	console.log( FgRed, __callerFileName );
//	console.log( Reset, __line );
//
//	stream.write( __filename + arguments.callee.caller.toString(), function(){
//		// console.log( arguments );
//	} );
//}
//
//
//
//function setLevel(){
//	console.log( "SET LEVEL" );
//}
//
//
//
//function log( path, type, message ){
//	// console.log( message );
//
//	// var curTime = new Date();
//	// curTime = curTime.toISOString();
//	//
//	// stream.write( "[" + path + " - " + curTime + "] - [" + type + "] - [" + message + "]\n"  );
//}
//
//
//
//
//
//function getFunctionName( func )
//{
//   func = func.substr('function '.length);
//   func = func.substr(0, func.indexOf('('));
//
//	 return func;
//}
//
//
//Object.defineProperty(global, '__callerFileName', {
//	get: function(){
//		try {
//			var err = new Error();
//			var callerfile;
//			var currentfile;
//
//			Error.prepareStackTrace = function (err, stack) { return stack; };
//
//			currentfile = err.stack.shift().getFileName();
//
//			while (err.stack.length) {
//			    callerfile = err.stack.shift().getFileName();
//			    if(currentfile !== callerfile) return callerfile;
//			}
//		} catch (err) {}
//			return undefined;
//		}
//});
//
//Object.defineProperty(global, '__stack', {
//	get: function(){
//		var orig = Error.prepareStackTrace;
//		Error.prepareStackTrace = function(_, stack){ return stack; };
//
//		var err = new Error;
//		Error.captureStackTrace(err, arguments.callee.caller);
//
//		var stack = err.stack;
//		Error.prepareStackTrace = orig;
//
//		return stack;
//	}
//});
//
//Object.defineProperty(global, '__line', {
//	get: function(){
//		return __stack[1].getLineNumber();
//	}
//});

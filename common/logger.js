module.exports.initLogger = initLogger;
module.exports.setLevel = setLevel;
module.exports.log = log;
//module.exports = error;
//module.exports = info;
//module.exports = debug;




const fs = require( "fs" );
const stream = fs.createWriteStream( require("path").join(process.cwd(), "properties", "logTest.log") );

function initLogger( filePath, sepearteTerm ){
	stream.write( "DATA", function(){
		// console.log( arguments );
	} );
}



function setLevel(){
	console.log( "SET LEVEL" );
}

function log( path, type, message ){
	var curTime = new Date();
	curTime = curTime.toISOString();
	
	stream.write( "[" + path + " - " + curTime + "] - [" + type + "] - [" + message + "]\n"  );
}
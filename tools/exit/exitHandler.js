// Exit control - start
process.stdin.resume();//so the program will not close instantly


//do something when app is closing
process.on( 'exit', function(){
	console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "Receive exit signal" );

	Promise.resolve( exitHandler( {cleanup:true} ) );
} );

//catches ctrl+c event
process.on( 'SIGINT', function(){
	console.log( "\n" );
	console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "Receive SIGINT" );

	releaseResources()
	.then( exitHandler.bind(null,{exit:true}) )
	.catch( function(err){
		throw err;
	} );
} );

//catches uncaught exceptions
process.on( 'uncaughtException', function(){
	console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "Receive uncaughtException (Process End)" );

	Promise.resolve( exitHandler( {exit:true} ) );
} );
// Exit control - end




//***************************************************
//** Default Exit Handler
//***************************************************
function exitHandler(options) {
	return new Promise( function(resolve, reject){

		try{
			if (options.cleanup){
				console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "Clean node" );
				resolve( "clean" );
			}
			if (options.exit){

				var clientExitHandler = require( __clientExitHandler );
				Promise.resolve( clientExitHandler() );

				process.exit();
			}

		} catch( err ){
			console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[exitHandler.js]", err );
			reject( err );
		}
	} );
}





//***************************************************
//** Release Resources
//***************************************************
function releaseResources(){
	return new Promise( function(resolve, reject){
		var promises = [];

		promises.push( releaseGlobalPool() );
		promises.push( releaseLogFileStream() );

		Promise.all( promises )
		.then( function(){
			var argv = arguments[0];

			for( var i=0; i<argv.length; i++ ){
				console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", argv[i].message );
			}
			resolve();
		} )
		.catch( function(err){
			console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[exitHandler.js]", err );
			reject( err );
		} );
	} );
}




//***************************************************
//** Release mysql pool - Tools
//***************************************************
function releaseGlobalPool(){
	return new Promise( function(resolve, reject){
		try{
			var messageArray = [];

			if( __mysqlHandlerUsage ){
				mysqlPool.end();
				messageArray.push( "Release Mysql Pool" );

				if( pool.dbms === "mysql" ) pool.end();
			} 
			if( __mssqlHandlerUsage ){
				mssqlPool.close();
				messageArray.push( "Release Mssql Pool" );

				if( pool.dbms === "mssql" ) pool.close();
			}

			var message = "";
			for( var i=0; i<messageArray.length; i++ ){
				message += messageArray[i] + ", ";
			}

			message = message.trim();
			message = message.substring( 0, message.length - 1 );

			resolve( {"message" : message} );
			
		} catch( err ){
			console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[exitHandler.js]", err );
			reject( err );
		}
	} );
}





//***************************************************
//** Release Default LogFile Stream - Tools
//***************************************************
function releaseLogFileStream(){
	return new Promise( function(resolve, reject){
		try{
			if( __loggerUsage ){
				logFileWriteStream.close();
				logFileWriteStream.end();

				resolve( {"message" : "Release Default Log File Stream"} );
			} else{
				resolve( "" );
			}
		} catch( err ){
			console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[exitHandler.js]", err );
			reject( err );
		}
	} );
}

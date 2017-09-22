// Exit control - start
process.stdin.resume();//so the program will not close instantly
process.on('exit', exitHandler.bind(null,{cleanup:true})); //do something when app is closing
process.on('SIGINT', exitHandler.bind(null, {exit:true})); //catches ctrl+c event
process.on('uncaughtException', exitHandler.bind(null, {exit:true})); //catches uncaught exceptions
// Exit control - end


logger.debug( "HERE" );

function exitHandler(options, err) {
//	stream.end();

	if (options.cleanup) console.log('clean..........');
	if (err) console.log(err.stack);
	if (options.exit) process.exit();
}
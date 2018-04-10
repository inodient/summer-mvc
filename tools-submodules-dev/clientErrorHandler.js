module.exports = clientErrorHandler;

function clientErrorHandler(err, req, res, next){
//	logger.info( "Error Occured..." );
//	logger.info( "clientErrorHandler called..." );
	next( err );
}
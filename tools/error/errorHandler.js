module.exports.logErrors = logErrors;
module.exports.clientErrorHandler = require( __clientErrorHandler );
module.exports.defaultLogHandler = defaultLogHandler;





function logErrors(err, req, res, next){
	var code = err.code == undefined ? "" : err.code;
	var message = err.message;
	var stack = err.stack;
	
	var logMsg = "";
	if( code == "" ){
		logMsg = code + "\n" + message + "\n" + stack;
	} else{
		logMsg = message + "\n" + stack;
	}
	
	logger.error( "Error Occured when [" + req.path + "] called." + logMsg );
	next(err);
}

function defaultLogHandler(err, req, res, next) {

  if (res.headersSent) {
    console.log( "Already Header Sent" );
    return next(err);
  }

  var statusCode = res.statusCode;
  
  if( statusCode == "404" ){
	  res.render( "error.html" );  
  } else if( statusCode == "500" ){
	  res.render( "error.html" );
  } else if( statusCode == "200" ){
	  res.status( 404 );
	  res.render( "error.html" );
  } else{
	  res.render( "error.html" );
  }
  
}

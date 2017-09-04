module.exports = errorHandler;

function errorHandler(err, req, res, next) {

  console.log( res.statusCode );

  if (res.headersSent) {
    console.log( "Already Header Sent" );
    return next(err);
  }

  console.log( "Default Error Handler Occured : Message is ..... " );
  console.log( "------------------" );
  console.log( err );
  console.log( "------------------" );

  // res.status(404);
  res.render( "error.html" );
  // res.render('error', { error: err });

  if( 1 ){
    res.status(100);
  } else if( 2 ){
    res.status(200);
  } else if( 3 ){
    res.status(300);
  } else if( 4 ){
    res.status(400);
  } else if( 5 ){
    res.status(500);
  }
}

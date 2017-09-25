const express = require( "express" );
var app = express();

const setter = require( "./express_was_setter.js" );





// Setting Tools
var setterPromises = [];

setterPromises.push( setter.parseAnnotation() );
setterPromises.push( setter.setViewInfo( express, app ) );
setterPromises.push( setter.setBodyParser( app ) );
setterPromises.push( setter.setConnectionHandler( app ) );
setterPromises.push( setter.setFileHandler() );
setterPromises.push( setter.setMysqlHandler() );
setterPromises.push( setter.setExitHandler() );

Promise.all( setterPromises )
.then( function(){
	var argv = arguments[0];

	for( var i=0; i<argv.length; i++ ){
		if( argv[i].message ){
			logger.info( "Initializing : " + argv[i].message );
		}
	}
} )
.catch( function(err){
	logger.error( err );
} );




// set context Dispatcher
const contextDispatcher = require( __contextDispatcher );




// Start WAS
app.set('port', (process.env.PORT || __defaultPort)); // 3000 was my original port

app.listen( app.get('port'), () => {
  logger.info( "Listen Port : " + app.get('port') );
} );





app.get( "/*", (req, res, next) => {

  logger.info( "ACCEPTED-LANGUAGE :", req.headers["accept-language"] );
  logger.info( "REQUEST PATH :", req.path );

  // 2. Dispatcher
  contextDispatcher.dispatching( req, res )
  .then( function( mav ){

    try{
      // 2-1. Ajax
      if( req.xhr || (req.headers["accept"] && req.headers.accept.indexOf("json") > -1) ){
    	  res.status(200);
        res.send( mav.model );
      }
      // 2-2. With View
      else{
        let contentDisposition = res._headers[ "content-disposition" ];

        // 2-2-1. Render View
        if( !contentDisposition ){

          res.status(200);
          res.render( mav.view, mav.model );
        }
        // 2-2-2. File Download
        else{
          res.status(200);
          // res.download( require("path").join(mav.model.savedPath, mav.model.savedFileName), mav.model.originalFileName );
        }

      }
    } catch( err ){
      res.status(404);
      next( err );
    }
  } )
  .catch( function(err){
    res.status(500);
    next( err );
  } );
} );

app.post( "/*", (req, res, next) => {

  logger.info( "ACCEPTED-LANGUAGE :", req.headers["accept-language"] );
  logger.info( "REQUEST PATH :", req.path );

  // 2. Dispatcher
  contextDispatcher.dispatching( req, res )
  .then( function( mav ){
    // 2-1. Ajax
    try{
      if( req.xhr || req.headers.accept.indexOf("json") > -1 ){
    	  res.status(200);
    	  res.send( mav.model );
      }
      // 2-2. With View
      else{
        let contentDisposition = res._headers[ "content-disposition" ];

        // 2-2-1. Render View
        if( !contentDisposition ){
        	res.status(200);
        	res.render( mav.view, mav.model );
        }
        // 2-2-2. File Download
        else{
        	res.status(200);
        	res.download( require("path").join(mav.model.savedPath, mav.model.savedFileName), mav.model.originalFileName );
        }
      }
    } catch( err ){
      console.log( "Error occured while res rendering : app.post" );
      res.status(404);
      next( err );
    }
  } )
  .catch( function(err){
    console.log( "Error catched in app.post method..." );
    res.status(500);
    next( err );
  } );
} );





// set error handler
setter.setErrorHandler( app );

const express = require( "express" );
const app = express();

const setter = require( "./express_was_setter.js" );

setter.parseAnnotation();
setter.setViewInfo( express, app );
setter.setBodyParser( app );

setter.setConnectionHandler( app );
setter.setFileHandler();
setter.setMysqlHandler();




// set context Dispatcher
const contextDispatcher = require( __contextDispatcher );




// Start WAS
app.set('port', (process.env.PORT || __defaultPort)); // 3000 was my original port

app.listen( app.get('port'), () => {
  console.log( "Listen Port : " + app.get('port') );
} );




//const Promise = require( "bluebird" );




app.get( "/*", (req, res, next) => {

  console.log( req.headers["accept-language"] );
  console.log( req.path );

  // 2. Dispatcher
  contextDispatcher.dispatching( req, res, next )
  .then( function( mav ){

    try{
      // 2-1. Ajax
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
      console.log( "Error occured while res rendering : app.get" );
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

  console.log( req.headers["accept-language"] );
  console.log( req.path );

  // 2. Dispatcher
  contextDispatcher.dispatching( req, res, next )
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
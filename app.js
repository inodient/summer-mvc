const express = require( "express" );
const app = express();




// ***************************************************
// ** Prepare Controller
// ***************************************************
if( __annotationParserUsage ){
	annotationParser = require( __annotationParser );
}






// ***************************************************
// ** Prepare view
// ***************************************************
// 1. set View Engine : specific for ejs
if( __viewEngine == "ejs" ){
	app.set( "view engine", __viewEngine );
	app.engine( "html", require(__viewEngine).renderFile );
	app.set( "views", __viewsRunningPath );
}
// 2. set static Folders
for( var i=0; i<__staticFolders.length; i++ ){
  app.use( express.static(__staticFolders[i]) );
}




//// Init global module's paths;
//global.dbHandler = require( "./common/dbHandler.js" ).dbHandler;
//global.connectionHandler = require( "./common/connection.js" ).connection;
//global.fileHandler = require( "./common/fileHandler.js" ).fileHandler;
//global.Promise = require( "bluebird" );
//global.Busboy = require( "busboy" );
//global.mime = require( "mime" );
//
//global.mysql = require( "mysql" );
//global.pool = mysql.createPool( require(require("path").join(process.cwd(), "properties", "db.json") ) );
//
//
//
//// Init cookie, session
//const cookieParser = require( "cookie-parser" );
//app.use( cookieParser() );
//
//const session = require( "express-session" );
//app.use( session({
//  secret : "aslknq;oiwne;ofuiba;osudbf;uoasdf",
//  resave : false,
//  saveUninitialized : true,
//  cookie : {
//    maxAge: 1000 * 60 * 60
//  }
//}) );
//
//
//
//
//
// Init body Parser
const bodyParser = require( "body-parser" );
app.use( bodyParser.urlencoded({ extended : true }) );






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
if( __errorHandlerUsage ){
	var errorHandler = require( __errorHandler );
	app.use( errorHandler.logErrors );
	app.use( errorHandler.clientErrorHandler );
	app.use( errorHandler.defaultLogHandler );
}
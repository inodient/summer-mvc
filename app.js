const express = require( "express" );
const app = express();





// Init global module's paths;
global.dbHandler = require( "./common/dbHandler.js" ).dbHandler;
global.connectionHandler = require( "./common/connection.js" ).connection;
global.fileHandler = require( "./common/fileHandler.js" ).fileHandler;
global.Promise = require( "bluebird" );
global.Busboy = require( "busboy" );
global.path = require( "path" );
global.fs = require( "fs" );
global.mime = require( "mime" );

global.mysql = require( "mysql" );
global.pool = mysql.createPool( require(require("path").join(process.cwd(), "properties", "db.json") ) );

//Set Default Logger
global.logger = require( require("path").join( process.cwd(), "common", "logger.js") );
// logger.initLogger();



// Init cookie, session
const cookieParser = require( "cookie-parser" );
app.use( cookieParser() );

const session = require( "express-session" );
app.use( session({
  secret : "aslknq;oiwne;ofuiba;osudbf;uoasdf",
  resave : false,
  saveUninitialized : true,
  cookie : {
    maxAge: 1000 * 60 * 60
  }
}) );





// Init body Parser
const bodyParser = require( "body-parser" );
app.use( bodyParser.urlencoded({ extended : true }) );




// Init summer-mvc structure
const initializer = require( "./common/initializer" );
initializer.initStructure();




// set View Engine : specific for ejs
const viewEngine = initializer.getViewEngine();

app.set( "view engine", viewEngine );
app.engine( "html", require(viewEngine).renderFile );
app.set( "views", "views" );




// set static Folders
const staticFolders = initializer.getStaticFolders();

for( var i=0; i<staticFolders.length; i++ ){
  app.use( express.static(staticFolders[i]) );
}




// set context Dispatcher
const contextDispatcher = require( initializer.getContextDispatcherPath() );
//const controllerDispatcher = ( initializer.getControllerDispatcherPath() === undefined ) ? undefined : require( initializer.getControllerDispatcherPath() );




// Start WAS
const port = initializer.getPort();
app.set('port', (process.env.PORT || port)); // 3000 was my original port

app.listen( app.get('port'), () => {
  console.log( "Listen Port : " + app.get('port') );
} );




const Promise = require( "bluebird" );




app.get( "/*", (req, res, next) => {

  console.log( req.headers["accept-language"] );
  console.log( req.path );

  // 2. Dispatcher
  contextDispatcher.dispatching( req, res, next )
  .then( function( mav ){

    try{
      // 2-1. Ajax
      if( req.xhr || req.headers.accept.indexOf("json") > -1 ){
        res.send( mav.model );
      }
      // 2-2. With View
      else{
        let contentDisposition = res._headers[ "content-disposition" ];

        // 2-2-1. Render View
        if( !contentDisposition ){
          res.render( mav.view, mav.model );
        }
        // 2-2-2. File Download
        else{
          res.download( require("path").join(mav.model.savedPath, mav.model.savedFileName), mav.model.originalFileName );
        }

      }
    } catch( err ){
      console.log( "Error occured while res rendering : app.get" );
      res.status(404);
      logger.log( "controller/controller_ajax.js", "ERROR", err );
      next( err );
    }
  } )
  .catch( function(err){
    console.log( "Error catched in app.get method..." );
    console.dir( err );

    console.log( typeof err );

    logger.log( "controller/controller_ajax.js", "ERROR", err.stack );
    res.status(500);
    next( err );
  } );
} );

app.post( "/*", (req, res) => {

  console.log( req.headers["accept-language"] );
  console.log( req.path );

  // 2. Dispatcher
  contextDispatcher.dispatching( req, res )
  .then( function( mav ){
    // 2-1. Ajax
    try{
      if( req.xhr || req.headers.accept.indexOf("json") > -1 ){
        res.send( mav.model );
      }
      // 2-2. With View
      else{
        let contentDisposition = res._headers[ "content-disposition" ];

        // 2-2-1. Render View
        if( !contentDisposition ){
          res.render( mav.view, mav.model );
        }
        // 2-2-2. File Download
        else{
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
const errorHandler = require( initializer.getDefaultErrorHandler() );
// app.use( logErrors );
// app.use( clientErrorHandler );
app.use( errorHandler );

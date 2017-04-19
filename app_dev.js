const express = require( "express" );
const app = express();




// Init cookie, body parser
const cookieParser = require( "cookie-parser" );
app.use( cookieParser() );

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
const controllerDispatcher = ( initializer.getControllerDispatcherPath() === undefined ) ? undefined : require( initializer.getControllerDispatcherPath() );




// Start WAS
const port = initializer.getPort();

app.listen( port, () => {
  console.log( "Listen Port : " + port );
} );




// Wait Request
app.get( "/*", (req, res) => {
  try{
    // burn cookie

    // make session
    
    var mav = contextDispatcher.dispatching( req, controllerDispatcher );

    console.log( "view  : " + mav.view );
    console.log( "model : " + JSON.stringify(mav.model) );

    if( req.xhr || req.headers.accept.indexOf("json") > -1 ){
      console.log( "Ajax Called...." );
      res.send( mav.model );
    } else{
      res.render( mav.view, mav.model );
    }
  } catch( e ){
    console.log( e );

    res.render( "error.html" );
  }
} );

app.post( "/*", (req, res) => {
  try{
    var mav = contextDispatcher.dispatching( req, controllerDispatcher );

    console.log( "view  : " + mav.view );
    console.log( "model : " + JSON.stringify(mav.model) );

    if( req.xhr || req.headers.accept.indexOf("json") > -1 ){
      console.log( "Ajax Called...." );
      res.send( mav.model );
    } else{
      res.render( mav.view, mav.model );
    }
  } catch( e ){
    console.log( e );

    res.render( "error.html" );
  }
} );

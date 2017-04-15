const express = require( "express" );
const app = express();

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
const contextDispatcher = require( initializer.getContextDispatcher() );




// Start WAS
const port = initializer.getPort();

app.listen( port, () => {
  console.log( "Listen Port : " + port );
} );




// Wait Request
app.get( "/*", (req, res) => {
  try{
    var mav = contextDispatcher.dispatching( req );

    console.log( "view  : " + mav.view );
    console.log( "model : " + mav.model );

    res.render( mav.view, mav.model );
  } catch( e ){
    console.log( e );

    res.render( "default/error.html" );
  }

  // res.send( "summer-mvc : " + req.query.toString() );
} );

app.post( "/*", (req, res) => {
  try{
    var mav = contextDispatcher.dispatching( req, pathes );

    console.log( "view  : " + mav.view );
    console.log( "model : " + mav.model );

    res.render( mav.view, mav.model );
  } catch( e ){
    console.log( e );

    res.render( "default/error.html" );
  }
} );

//Set Default WAS Engine
const express = require( "express" );
const app = express();

// Set body Parser
const bodyParser = require( "body-parser" );
app.use( bodyParser.urlencoded({extended : true}) );

app.use( express.static("js") );


// Set default Viewing info
app.set( "view engine", "ejs" );
app.engine( "html", require("ejs").renderFile );

exports.setDefaultViewPath = function( path ){

  console.log( "setDefaultViewPath" );

  if( path ){
    app.set( "views", require("./js/common.js").parsePath(path) );
  } else{
    app.set( "views", require("./js/common.js").parsePath( __dirname + "/views") );
  }
}



// Set Basic Dispatching Info
var common = require( "./js/common.js" );
var Pathes = common.Pathes;
var pathes = new Pathes();

var dispatcher = require( "./dispatcher/context-dispatcher.js" );

exports.setContextDispatchingInfo = function( path, file ){

  console.log( "setContextDispatchingInfo" );

  if( path ){
    pathes.setDispatcherPath( path );
  } else{
    pathes.setDispatcherPath( common.parsePath(__dirname + "/dispatcher") );
  }

  if( file ){
    pathes.setDispatcherJS( file );
  } else{
    pathes.setDispatcherJS( "context-dispatcher.json" );
  }

  dispatcher.setDispatchingInfo( path, file );
}

exports.setControllerDispatchingInfo = function( path, file ){

  console.log( "setControllerDispatchingInfo" );

  if( path ){
    pathes.setControllerDispatcherPath( path );
  } else{
    pathes.setControllerDispatcherPath( common.parsePath(__dirname + "/controller") );
  }

  if( file ){
    pathes.setControllerDispatcherJS( file );
  } else{
    pathes.setControllerDispatcherJS( "controller-dispatcher.json" );
  }
}

exports.setServicerPath = function( path ){

  console.log( "setServicerPath" );

  if( path ){
    pathes.setServicerPath( path );
  } else{
    pathes.setServicerPath( __dirname + "/services" )
  }
}



// WAS Start
exports.init = function( port ){

  this.setDefaultViewPath();
  this.setContextDispatchingInfo();
  this.setControllerDispatchingInfo();
  this.setServicerPath();

  app.listen( port, () => {
    console.log( "listen port : " + port );
  } );
}

app.get( "/*", (req, res, next) => {
  try{
    var mav = dispatcher.dispatching( req, pathes );

    console.log( "mav.view : " + mav.view + ", mav.model : " + mav.model );

    res.render( mav.view, mav.model );
  } catch( e ){
    console.log( e );

    res.render( "default/error.html" );
  }
} );

app.post( "/*", (req, res) => {
  try{
    var mav = dispatcher.dispatching( req, pathes );

    console.log( "mav.view : " + mav.view + ", mav.model : " + mav.model );

    res.render( mav.view, mav.model );
  } catch( e ){
    console.log( e );

    res.render( "default/error.html" );
  }
} );

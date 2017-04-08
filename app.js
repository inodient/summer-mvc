//Set Default WAS Engine
const express = require( "express" );
const app = express();

// Set body Parser
const bodyParser = require( "body-parser" );
app.use( bodyParser.urlencoded({extended : true}) );




// Set default Viewing info
app.set( "view engine", "ejs" );
app.engine( "html", require("ejs").renderFile );

exports.setDefaultViewPath = function( path ){
  app.set( "views", require("./js/common.js").parsePath(path) );
}




// Set Basic Dispatching Info
var common = require( "./js/common.js" );
var Pathes = common.Pathes;
var pathes = new Pathes();

var dispatcher = require( "./dispatcher/context-dispatcher.js" );

exports.setContextDispatchingInfo = function( path, file ){
  pathes.setDispatcherPath( path );
  pathes.setDispatcherJS( file );

  dispatcher.setDispatchingInfo( path, file );
}

exports.setControllerDispatchingInfo = function( path, file ){
  pathes.setControllerDispatcherPath( path );
  pathes.setControllerDispatcherJS( file );
}

exports.setServicerPath = function( path ){
  pathes.setServicerPath( path );
}



// WAS Start
exports.init = function( port ){
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

    res.render( "error.html" );
  }
} );

app.post( "/*", (req, res) => {
  try{
    var mav = dispatcher.dispatching( req, pathes );

    console.log( "mav.view : " + mav.view + ", mav.model : " + mav.model );

    res.render( mav.view, mav.model );
  } catch( e ){
    console.log( e );

    res.render( "error.html" );
  }
} );

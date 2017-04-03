const express = require( "express" );
const app = express();

const bodyParser = require( "body-parser" );
app.use( bodyParser.urlencoded({extended : true}) );

app.set( "view engine", "ejs" );
app.engine( "html", require("ejs").renderFile );




var dispatcher = require( "./dispatcher/context-dispatcher.js" );

exports.setDispatcher = function( path, file ){
  dispatcher.setDispatcher( path, file );
}

exports.setDefaultViewPath = function( path ){
  app.set( "views", path );
}




app.get( "/*", (req, res) => {
  var mav = dispatcher.dispatching( req );

  console.log( "mav.view : " + mav.view + ", mav.model : " + mav.model );

  res.render( mav.view, mav.model );
} );

app.post( "/*", (req, res) => {
  var mav = dispatcher.dispatching( req );

  console.log( "mav.view : " + mav.view + ", mav.model : " + mav.model );

  res.render( mav.view, mav.model );
} );





app.listen( "3004", () => {
  console.log( "listen port 3004...." );
} );

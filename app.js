const express = require( "express" );
const app = express();




var dispatcher = require( "./dispatcher/context-dispatcher.js" );

exports.setDispatcher = function( path, file ){
  dispatcher.setDispatcher( path, file );
}

exports.setDefaultViewPath = function( path ){
  app.set( "views", path );
}




app.get( "/*", (req, res) => {
  var mav = dispatcher.dispatching( req );

  res.render( mav.view, mav.model );
} );

app.post( "/*", (req, res) => {
  var mav = dispatcher.dispatching( req );

  res.render( mav.view, mav.model );
} );





app.listen( "3004", () => {
  console.log( "listen port 3004...." );
} );

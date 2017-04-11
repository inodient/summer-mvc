const was = require( "./app.js" );

exports.init = function( port ){
  was.init( port );
}

exports.setContextDispatchingInfo = function( path, file ){
  was.setContextDispatchingInfo( path, file );
}

exports.setControllerDispatchingInfo = function( path, file ){
  was.setControllerDispatchingInfo( path, file );
}

exports.setServicerPath = function( path ){
  was.setServicerPath( path );
}

exports.setDefaultViewPath = function( path ){
  was.setDefaultViewPath( path );
}

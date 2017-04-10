const was = require( "./app.js" );

// exports.init = function( port ){
//   was.init( port );
// }
//
// exports.setContextDispatchingInfo = function( path, file ){
//   was.setContextDispatchingInfo( __dirname + "/dispatcher", "dispatcher.json" );
// }
//
// exports.setControllerDispatchingInfo = function( path, file ){
//   was.setControllerDispatchingInfo( __dirname + "/controller", "controller-dispatcher.json" );
// }
//
// exports.setServicerPath = function( path ){
//   was.setServicerPath( __dirname + "/services" );
// }
//
// exports.setDefaultViewPath = function( path ){
//   was.setDefaultViewPath( __dirname + "/views" );
// }

try{

  was.init( 3000 );
  // was.setContextDispatchingInfo( __dirname + "/dispatcher", "dispatcher.json" );
  // was.setControllerDispatchingInfo( __dirname + "/controller", "controller-dispatcher.json" );
  // was.setServicerPath( __dirname + "/services" );
  //
  // was.setDefaultViewPath( __dirname + "/views" );

} catch( e ){
  console.log( e );
}

function setDispatcher( path, file ){
  var dispatchingInfo = require( "./controller-dispatcher.json" );

  var os = "windows";

  if( path ){
    if( file ){
      if( os === "windows" ){
        dispatchingInfo = require( path + "\\" + file );
      } else{
        dispatchingInfo = require( path + "/" + file );
      }

    } else{
      dispatchingInfo = require( path );
    }
  }
  return dispatchingInfo;
}

exports.dispatching = function( req, dispatcherPath, dispatcher ){

  console.log( setDispatcher( dispatcherPath, dispatcher ) );

  return { "result" : "Dispatching Succeed" };
}

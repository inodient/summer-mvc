var common = require( "../js/common.js" );

var dispatchingInfo;

function setDispatchingInfo( path, file ){
  try{


    if( path ){
      if( file ){
        path = path + "/" + file;
      }

      dispatchingInfo = require( common.parsePath(path) );
    } else{
      dispatchingInfo = require( "./controller-dispatcher.json" );
    }

  } catch( e ){
    console.log( e );
  }
}

exports.dispatching = function( req, pathes ){
  setDispatchingInfo( pathes.controllerDispatcherPath, pathes.controllerDispatcherJS );

  // get req specifics
  var action;

  try{
    if( req.method.toUpperCase() === "GET" ){
      action = req.query.action;
    } else if( req.method.toUpperCase() === "POST" ){
      action = req.body.action;
    }
  } catch( e ){
    console.log( e );
  }

  // get dispatching Info
  var length;
  var servicerPath;
  var servicerJS;
  var serviceFunction;

  try{
    var model = {};
    length = dispatchingInfo.length;

    for( var i=0; i<length; i++ ){
      // servicerPath = dispatchingInfo[i].servicerPath;
      servicerPath = pathes.servicerPath;
      servicerJS = dispatchingInfo[i].servicerJS;
      serviceFunction = dispatchingInfo[i].serviceFunction;

      if( action === dispatchingInfo[i].action ){

        var servicer;
        if( servicerPath ){
          servicer = require( require("../js/common.js").parsePath(servicerPath + "/" + servicerJS) );
        } else{
          servicer = require( servicerJS );
        }

        model = servicer[ serviceFunction ]( req, model, pathes );
      }
    }
  } catch( e ){
    console.log( e );
  }

  return model;
}

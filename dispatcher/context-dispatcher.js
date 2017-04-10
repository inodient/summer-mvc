var common = require( "../js/common.js" );
var ModelAndView = common.ModelAndView;




// Set Dispatcher & Dispatching Info (JSON)
var dispatchingInfo;

exports.setDispatchingInfo = function( path, file ){
  try{
    dispatchingInfo = require( "./context-dispatcher.json" );

    if( path ){
      if( file ){
        path = path + "/" + file;
      }

      dispatchingInfo = require( common.parsePath(path) );
    }

  } catch( e ){
    console.log( e );
  }
}

exports.getDispatcher = function(){
  return dispatchingInfo;
}



// Execute Dispatching
exports.dispatching = function( req, pathes ){

  var mav = new ModelAndView();

  // get req specifics
  try{
    var reqMethod = req.method;
    var reqPath = req._parsedUrl.pathname;
  } catch( e ){
    console.log( e );
  }

  // get dispatchingInfo
  var length;
  var dispatchingSpec;
  var dispatchedPath;
  var controllerPath;
  var controllerJS;
  var controlFunction;
  var controllerDispatcherPath;
  var controllerDispatcherJSON;
  var viewPath;
  var view;

  if( reqMethod.toUpperCase() === "GET" ){

    try{
      length = dispatchingInfo.GET.length;

      for( var i=0; i<length; i++ ){
        dispatchingSpec = dispatchingInfo.GET[i];

        dispatchedPath = dispatchingSpec.path;
        // controllerPath = dispatchingSpec.controllerPath;
        controllerPath = pathes.controllerDispatcherPath;
        controllerJS = dispatchingSpec.controllerJS;
        controlFunction = dispatchingSpec.controlFunction;
        // controllerDispatcherPath = dispatchingSpec.dispatcherPath;
        // controllerDispatcherJSON = dispatchingSpec.dispatcherJSON;
        viewPath = dispatchingSpec.viewPath;
        view = dispatchingSpec.view;

        if( dispatchedPath === reqPath ){

          var controller;
          if( controllerPath ){
            controller = require( require("../js/common.js").parsePath(controllerPath + "/" + controllerJS) );
          } else{
            controller = require( controllerJS );
          }

          var model = controller[ controlFunction ]( req, pathes );

          mav.setModel( model );
          mav.setView( require("../js/common.js").parsePath(viewPath + "/" + view) );
          break;
        }
      }

      console.log( "dispatching Succeed... (GET)" );
    } catch( e ){
      console.log( e );
    }
  } else if( reqMethod.toUpperCase() === "POST" ){
    try{
      length = dispatchingInfo.POST.length;

      for( var i=0; i<length; i++ ){
        dispatchingSpec = dispatchingInfo.POST[i];
        dispatchedPath = dispatchingSpec.path;
        // controllerPath = dispatchingSpec.controllerPath;
        controllerPath = pathes.controllerDispatcherPath;
        controllerJS = dispatchingSpec.controllerJS;
        controlFunction = dispatchingSpec.controlFunction;
        // controllerDispatcherPath = dispatchingSpec.dispatcherPath;
        // controllerDispatcherJSON = dispatchingSpec.dispatcherJSON;
        viewPath = dispatchingSpec.viewPath;
        view = dispatchingSpec.view;

        if( dispatchedPath === reqPath ){

          var controller;
          if( controllerPath ){
            controller = require( require("../js/common.js").parsePath(controllerPath + "/" + controllerJS) );
          } else{
            controller = require( controllerJS );
          }

          var model = controller[ controlFunction ]( req, pathes );

          mav.setModel( model );
          mav.setView( require("../js/common.js").parsePath(viewPath + "/" + view) );
          break;
        }
      }

      console.log( "dispatching Succeed... (POST)" );
    } catch( e ){
      console.log( e );
    }
  }

  return mav;
}

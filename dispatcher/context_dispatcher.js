const dispatchingInfo = require( require("path").join(process.cwd(), "dispatcher", "context_dispatcher.json") );
const ModelAndView = require( "./model_and_view.js" ).ModelAndView;

exports.dispatching = function( req  ){
  let reqMethod = req.method;

  switch ( reqMethod.toUpperCase() ){
    case "GET":
      return dispatchingGet( req );

    case "POST":
      return dispatchingPost( req );

    default:
      break;
  }
}




function dispatchingGet( req ){
  let mav = new ModelAndView();

  let dispatchingSpec = findDispatchingSpec( "GET", req._parsedUrl.pathname );

  let controller = setController( dispatchingSpec.controllerJS );

  let model = executeController( controller, dispatchingSpec.controlFunction, req );
  let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

  mav.setModel( model );
  mav.setView( view );

  return mav;
}

function dispatchingPost( req, paths ){
  let mav = new ModelAndView();

  let dispatchingSpec = findDispatchingSpec( "GET", req._parsedUrl.pathname );

  let controller = setController( dispatchingSpec.controllerJS );

  let model = executeController( controller, dispatchingSpec.controlFunction, req );
  let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

  mav.setModel( model );
  mav.setView( view );

  return mav;
}

function findDispatchingSpec( method, reqPath ){
  let specifications = {};
  let dispatchingSpec = {};
  let length;

  if( method === "GET" ){
    specifications = dispatchingInfo[ "GET" ];
  } else if( method === "POST" ){
    specifications = dispatchingInfo[ "POST" ];
  }

  length = specifications.length;

  for( var i=0; i<length; i++ ){
    if( specifications[i].path === reqPath ){
      dispatchingSpec = specifications[i];
      break;
    }
  }

  return dispatchingSpec;
}

function setController( controllerJS ){
  let controller = require( require("path").join(process.cwd(), "controller", controllerJS) );

  return controller
}

function executeController( controller, controlFunction, req ){
  var model = {};

  model = controller[ controlFunction ]( req );

  return model;
}

// var common = require( "../js/common.js" );
// var ModelAndView = common.ModelAndView;

// exports.getDispatcher = function(){
//   return dispatchingInfo;
// }
//
//
//
// // Execute Dispatching
// exports.dispatching = function( req, pathes ){
//
//   var mav = new ModelAndView();
//
//   // get req specifics
//   try{
//     var reqMethod = req.method;
//     var reqPath = req._parsedUrl.pathname;
//   } catch( e ){
//     console.log( e );
//   }
//
//   // get dispatchingInfo
//   var length;
//   var dispatchingSpec;
//   var dispatchedPath;
//   var controllerPath;
//   var controllerJS;
//   var controlFunction;
//   var controllerDispatcherPath;
//   var controllerDispatcherJSON;
//   var viewPath;
//   var view;
//
//   if( reqMethod.toUpperCase() === "GET" ){
//
//     try{
//       length = dispatchingInfo.GET.length;
//
//       for( var i=0; i<length; i++ ){
//         dispatchingSpec = dispatchingInfo.GET[i];
//
//         dispatchedPath = dispatchingSpec.path;
//         // controllerPath = dispatchingSpec.controllerPath;
//         controllerPath = pathes.controllerDispatcherPath;
//         controllerJS = dispatchingSpec.controllerJS;
//         controlFunction = dispatchingSpec.controlFunction;
//         // controllerDispatcherPath = dispatchingSpec.dispatcherPath;
//         // controllerDispatcherJSON = dispatchingSpec.dispatcherJSON;
//         viewPath = dispatchingSpec.viewPath;
//         view = dispatchingSpec.view;
//
//         if( dispatchedPath === reqPath ){
//
//           var controller;
//
//           if( controllerJS == "controller-dispatcher.js" ){
//             controllerPath = "../controller";
//           }
//
//           if( controllerPath ){
//             controller = require( require("../js/common.js").parsePath(controllerPath + "/" + controllerJS) );
//           } else{
//             controller = require( controllerJS );
//           }
//
//           var model = controller[ controlFunction ]( req, pathes );
//
//           mav.setModel( model );
//
//           if( viewPath ){
//             mav.setView( require("../js/common.js").parsePath(viewPath + "/" + view) );
//           } else{
//             mav.setView( require("../js/common.js").parsePath(view) );
//           }
//
//           break;
//         }
//       }
//
//       console.log( "dispatching Succeed... (GET)" );
//     } catch( e ){
//       console.log( e );
//     }
//   } else if( reqMethod.toUpperCase() === "POST" ){
//     try{
//       length = dispatchingInfo.POST.length;
//
//       for( var i=0; i<length; i++ ){
//         dispatchingSpec = dispatchingInfo.POST[i];
//         dispatchedPath = dispatchingSpec.path;
//         // controllerPath = dispatchingSpec.controllerPath;
//         controllerPath = pathes.controllerDispatcherPath;
//         controllerJS = dispatchingSpec.controllerJS;
//         controlFunction = dispatchingSpec.controlFunction;
//         // controllerDispatcherPath = dispatchingSpec.dispatcherPath;
//         // controllerDispatcherJSON = dispatchingSpec.dispatcherJSON;
//         viewPath = dispatchingSpec.viewPath;
//         view = dispatchingSpec.view;
//
//         if( dispatchedPath === reqPath ){
//
//           var controller;
//           if( controllerPath ){
//             controller = require( require("../js/common.js").parsePath(controllerPath + "/" + controllerJS) );
//           } else{
//             controller = require( controllerJS );
//           }
//
//           var model = controller[ controlFunction ]( req, pathes );
//
//           mav.setModel( model );
//
//           if( viewPath ){
//             mav.setView( require("../js/common.js").parsePath(viewPath + "/" + view) );
//           } else{
//             mav.setView( require("../js/common.js").parsePath(view) );
//           }
//
//           break;
//         }
//       }
//
//       console.log( "dispatching Succeed... (POST)" );
//     } catch( e ){
//       console.log( e );
//     }
//   }
//
//   return mav;
// }

const dispatchingInfo = require( require("path").join(process.cwd(), "dispatcher", "context_dispatcher.json") );
const ModelAndView = require( "./model_and_view.js" ).ModelAndView;
// const connection = require( "../common/connection.js" ).connection;
// const db = require( "../common/dbHandler.js" );



exports.dispatching = function( req, res, callback ){
  let reqMethod = req.method;

  switch ( reqMethod.toUpperCase() ){
    case "GET":
      dispatchingGet( req, res, callback );
      break;

    case "POST":
      dispatchingPost( req, res, callback );
      break;

    default:
      break;
  }
}




function dispatchingGet( req, res, callback ){
  let mav = new ModelAndView();

  let dispatchingSpec = findDispatchingSpec( "GET", req._parsedUrl.pathname );

  let controller = setController( dispatchingSpec.controllerJS );

  let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

  executeController( controller, dispatchingSpec.controlFunction, req, res, function( err, model ){
    mav.setModel( model );
    mav.setView( view );

    callback( err, mav );
  } );
}

function dispatchingPost( req, res, callback ){
  let mav = new ModelAndView();

  let dispatchingSpec = findDispatchingSpec( "POST", req._parsedUrl.pathname );

  let controller = setController( dispatchingSpec.controllerJS );

  let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

  executeController( controller, dispatchingSpec.controlFunction, req, res, function( err, model ){
    mav.setModel( model );
    mav.setView( view );

    callback( err, mav );
  } );
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

  return controller;
}

function executeController( controller, controlFunction, req, res, callback ){
  if( callback ){
    controller[ controlFunction ]( req, res, callback );
  }
}

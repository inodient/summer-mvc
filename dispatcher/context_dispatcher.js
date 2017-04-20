const dispatchingInfo = require( require("path").join(process.cwd(), "dispatcher", "context_dispatcher.json") );
const ModelAndView = require( "./model_and_view.js" ).ModelAndView;
const connection = require( "../common/connection.js" ).connection;




exports.dispatching = function( req, res, controllerDispatcher ){
  let reqMethod = req.method;

  switch ( reqMethod.toUpperCase() ){
    case "GET":
      return dispatchingGet( req, res, controllerDispatcher );

    case "POST":
      return dispatchingPost( req, res, controllerDispatcher );

    default:
      break;
  }
}




function dispatchingGet( req, res, controllerDispatcher ){
  let mav = new ModelAndView();

  let dispatchingSpec = findDispatchingSpec( "GET", req._parsedUrl.pathname );

  let controller = setController( dispatchingSpec.controllerJS );
  let connection = getConnection( req, res );

  let model = executeController( controller, dispatchingSpec.controlFunction, req, res, connection, controllerDispatcher );
  let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

  mav.setModel( model );
  mav.setView( view );

  return mav;
}

function dispatchingPost( req, res, controllerDispatcher ){
  let mav = new ModelAndView();

  let dispatchingSpec = findDispatchingSpec( "GET", req._parsedUrl.pathname );

  let controller = setController( dispatchingSpec.controllerJS );
  let connection = getConnection( req, res );

  let model = executeController( controller, dispatchingSpec.controlFunction, req, res, connection, controllerDispatcher );
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

  return controller;
}

function executeController( controller, controlFunction, req, res, connection, controllerDispatcher ){
  var model = {};

  model = controller[ controlFunction ]( req, res, connection, controllerDispatcher );

  return model;
}

function getConnection( req, res ){
  let conn = new connection( req, res );

  return conn;
}

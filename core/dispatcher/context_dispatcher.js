exports.dispatching = function( req, res ){
  return new Promise( function(resolve, reject){
	let ModelAndView = require( __mav );


    let mav = new ModelAndView();
    let method = req.method.toUpperCase();

    let dispatchingSpec = getDispatchingSpec( method, req._parsedUrl.pathname );

    let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

    getController( dispatchingSpec.controllerJS )
    .then( executeController.bind( null, dispatchingSpec.controlFunction, req, res ) )
    .then( makeModelAndView.bind( null, mav, view ) )
    .then( function( mav ){
      resolve( mav );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}




function getDispatchingSpec( method, reqPath ){
  let dispatchingInfo = require( __contextDispatchingInfo );

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

function getController( controllerJS ){
  let path = require("path");
  let controller = require( path.join( __runningPath, __controllerPath, controllerJS) );

  return Promise.resolve( controller );
}

function executeController( controlFunction, req, res, controller ){
   return new Promise( function(resolve, reject){
     ( controller[ controlFunction ] )( req, res )
     .then( function(model){
       resolve( model );
     } )
     .catch( function(err){
       reject( err );
     } );
   } );

//  return Promise.resolve( controller[ controlFunction ]( req, res, next ) );
}

function makeModelAndView( mav, view, model ){
  try{
    mav.model = model;
    mav.view = view;

    return Promise.resolve( mav );
  } catch( err ){
    return Promise.reject( err );
  }
}

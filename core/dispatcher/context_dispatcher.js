exports.dispatching = function( req, res, next ){
  return new Promise( function(resolve, reject){
	let ModelAndView = require( __mav );

	  
    let mav = new ModelAndView();
    let method = req.method.toUpperCase();

    let dispatchingSpec = getDispatchingSpec( method, req._parsedUrl.pathname );

    let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

    getController( dispatchingSpec.controllerJS )
    .then( executeController.bind( null, dispatchingSpec.controlFunction, req, res, next ) )
    .then( makeModelAndView.bind( null, mav, view, next ) )
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

function executeController( controlFunction, req, res, next, controller ){
  // return new Promise( function(resolve, reject){
  //   ( controller[ controlFunction ] )( req, res, next )
  //   .then( function(model){
  //     resolve( model );
  //   } )
  //   .catch( function(err){
  //     reject( err );
  //   } );
  // } );

  return Promise.resolve( controller[ controlFunction ]( req, res, next ) );
}

function makeModelAndView( mav, view, next, model ){
  try{
    mav.model = model;
    mav.view = view;

    return Promise.resolve( mav, next );
  } catch( err ){
    return Promise.reject( err );
  }
}

exports.dispatching = function( req, res, dispatchingSpec ){
  return new Promise( function(resolve, reject){
	let ModelAndView = require( __mav );


    let mav = new ModelAndView();
    let method = req.method.toUpperCase();

    // let dispatchingSpec = getDispatchingSpec( method, req._parsedUrl.pathname );

    let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

    var promises = [];

    promises.push( getController(dispatchingSpec.controllerJS) );
    promises.push( getConnection() );

    Promise.all( promises )
    .then( function(){

    	var argv = arguments[0];

    	var controller = argv[0];
    	var connection = argv[1];

  		executeController( dispatchingSpec.controlFunction, req, res, controller, connection )
  		.then( makeModelAndView.bind( null, mav, view ) )
  	    .then( function( mav ){

  	    	releaseConnection( connection )
  	    	.then( function(){
  	    		resolve( mav );
  	    	} )
  	    	.catch( function(_err){
  	    		reject( _err );
  	    	} );

//	    	Promise.resolve( releaseConnection( connection ) );

		} )
		.catch( function(err){
			reject( err );
		} );
    } )
    .catch( function(err){
    	reject( err );
    } );
  } );
}




// function getDispatchingSpec( method, reqPath ){
//   let dispatchingInfo = require( __contextDispatchingInfo );
//
//   let specifications = {};
//   let dispatchingSpec = {};
//
//   let length;
//
//   if( method === "GET" ){
//     specifications = dispatchingInfo[ "GET" ];
//   } else if( method === "POST" ){
//     specifications = dispatchingInfo[ "POST" ];
//   }
//
//   length = specifications.length;
//
//   for( var i=0; i<length; i++ ){
//     if( specifications[i].path === reqPath ){
//       dispatchingSpec = specifications[i];
//       break;
//     }
//   }
//
//   return dispatchingSpec;
// }

function getController( controllerJS ){
	return new Promise( function(resolve, reject){
		try{
			let path = require("path");
			let controller = require( path.join(__runningPath, __controllerPath, controllerJS) );

			resolve( controller );
		} catch( err ){
			reject( err );
		}
	} );
}

function getConnection(){
	return new Promise( function(resolve, reject){
		if( __mysqlHandlerUsage ){
			mysqlHandler.getConnection( pool )
			.then( function(connection){
				resolve( connection );
			} )
			.catch( function(err){
				reject( err );
			} );
		} else{
			resolve( undefined );
		}
	} );
}

function releaseConnection( connection ){
	return new Promise( function(resolve, reject){
		if( __mysqlHandlerUsage ){
			try{
				resolve( mysqlHandler.releaseConnection( connection ) );
			} catch( err ){
				reject( err );
			}
		} else{
			resolve( undefined );
		}
	} );
}

function executeController( controlFunction, req, res, controller, connection ){
	return Promise.resolve( (controller[ controlFunction ])(req, res, connection) );

//	var execution = controller[ controlFunction ]( req, res );
//	var promiseExecution = Promise.resolve( execution );
//
//
//	if( promiseExecution === execution ){
//		logger.debug( "PROMISE CONTROLLER BODY" );
//
//		return new Promise( function(resolve, reject){
//		     ( controller[ controlFunction ] )( req, res )
//		     .then( function(model){
//		       resolve( model );
//		     } )
//		     .catch( function(err){
//		       reject( err );
//		     } );
//		   } );
//	} else{
//		logger.debug( "NORMAL CONTROLLER BODY" );
//		return promiseExecution;
//	}
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

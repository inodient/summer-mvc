exports.dispatching = function( req, res, dispatchingSpec ){
  return new Promise( function(resolve, reject){
	let ModelAndView = require( __mav );


    let mav = new ModelAndView();
    let method = req.method.toUpperCase();

    // let dispatchingSpec = getDispatchingSpec( method, req._parsedUrl.pathname );

    let view = require("path").join( dispatchingSpec.viewPath, dispatchingSpec.view );

    var promises = [];

    promises.push( getController(dispatchingSpec.controllerJS) );
    promises.push( getConnections() );

    Promise.all( promises )
    .then( function(){

    	var argv = arguments[0];

    	var controller = argv[0];
    	var connection = argv[1];

          executeController( dispatchingSpec.controlFunction, req, res, controller, connection )
  		.then( makeModelAndView.bind( null, mav, view ) )
  	    .then( function( mav ){

  	    	releaseConnections( connection )
  	    	.then( function(){
  	    		resolve( mav );
  	    	} )
  	    	.catch( function(_err){
  	    		logger.error( _err );
  	    		reject( _err );
  	    	} );

//	    	Promise.resolve( releaseConnection( connection ) );

		} )
		.catch( function(err){
			logger.error( err );
			reject( err );
		} );
    } )
    .catch( function(err){
    	logger.error( err );
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

function getConnections(){
	return new Promise( function(resolve, reject){
		var promises = [];

		promises.push( getMysqlConnection() );
		promises.push( getMssqlConnection() );

		Promise.all( promises )
		.then( function(){
			var argv = arguments[0];
			var connections = null;

			if( argv[0] === undefined || argv[1] === undefined ){
				if( argv[0] === undefined && argv[1] != undefined ){
					connections = argv[1];
				} else if( argv[0] != undefined && argv[1] === undefined ){
					connections = argv[0];
				} else{
					connections = null;
				}
			} else {
				connections = { "mysqlConnection":argv[0], "mssqlConnection":argv[1] };
			}

			resolve( connections );
		} )
		.catch( function(err){
			logger.error( err );
			reject( err );
		} );
	} );
}

function getMysqlConnection(){
	return new Promise( function(resolve, reject){
		if( __mysqlHandlerUsage ){
			mysqlHandler.getConnection( mysqlPool )
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

function getMssqlConnection(){
	return new Promise( function(resolve, reject){
		if( __mssqlHandlerUsage ){
			mssqlHandler.getConnection( mssqlPool )
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

function releaseConnections( connections ){
	return new Promise( function(resolve, reject){
		var promises = [];

		promises.push( releaseMysqlConnection(connections) );
		promises.push( releaseMssqlConnection(connections) );

		Promise.all( promises )
		.then( function(argv){
			resolve( argv );
		} )
		.catch( function(err){
			logger.error( err );
			reject( err );
		} );

	} );
}

function releaseMysqlConnection( connection ){
	return new Promise( function(resolve, reject){
		if( __mysqlHandlerUsage ){
			try{
				if( connection != undefined ){
					if( connection.mysqlConnection ){
						resolve( mysqlHandler.releaseConnection( connection.mysqlConnection ) );	
					} else{
						resolve( mysqlHandler.releaseConnection( connection ) );
					}
				}
			} catch( err ){
				reject( err );
			}
		} else{
			resolve( undefined );
		}
	} );
}

function releaseMssqlConnection( connection ){
	return new Promise( function(resolve, reject){
		resolve( undefined );

		// if( __mssqlHandlerUsage ){
		// 	try{
		// 		resolve( mssqlHandler.releaseConnection( connection.mssqlConnection ) );
		// 	} catch( err ){
		// 		reject( err );
		// 	}
		// } else{
		// 	resolve( undefined );
		// }
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

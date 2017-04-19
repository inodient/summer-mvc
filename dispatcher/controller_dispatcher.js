const dispatchingInfo = require( require("path").join(process.cwd(), "dispatcher", "controller_dispatcher.json") );

exports.dispatching = function( req, distributor, useCallChain ){

  if( useCallChain == undefined || useCallChain == false ){
    return dispatchingById( req, distributor );
  } else if( useCallChain == true ){
    return dispatchingByCallChain( req, distributor );
  } else{
    return undefined;
  }
}




function dispatchingById( req, id ){
  let dispatchingSpec = findDispatchingSpecById( id );

  let servicer = setServicer( dispatchingSpec.servicerJS );

  let model = executeServicer( servicer, dispatchingSpec.serviceFunction, req );

  return model;
}

function dispatchingByCallChain( req, callChain ){
  let dispatchingSpec = findDispatchingSpecByCallChain( callChain );

  let length = dispatchingSpec.length;

  let model = {};

  for( var i=0; i<length; i++ ){

    let servicer = setServicer( dispatchingSpec[i].servicerJS );

    model = executeServicer( servicer, dispatchingSpec[i].serviceFunction, req, model );
  }

  return model;
}




function findDispatchingSpecById( id ){
  let dispatchingSpec = {};
  let length;

  length = dispatchingInfo.length;

  for( var i=0; i<length; i++ ){

    if( dispatchingInfo[i].id == id ){
      dispatchingSpec = dispatchingInfo[i];
      break;
    }
  }

  return dispatchingSpec;
}

function findDispatchingSpecByCallChain( callChain ){
  let dispatchingSpec = [];
  let length;

  length = dispatchingInfo.length;

  for( var i=0; i<length; i++ ){

    if( dispatchingInfo[i].callChain == callChain ){
      dispatchingSpec.push( dispatchingInfo[i] );
    }
  }

  return dispatchingSpec;
}




function setServicer( servicerJS ){

  let servicer = require( require("path").join(process.cwd(), "service", servicerJS) );

  return servicer;
}

function executeServicer( servicer, serviceFunction, req, model ){
  var mode = {};

  model = servicer[ serviceFunction ]( req, model );

  return model;
}

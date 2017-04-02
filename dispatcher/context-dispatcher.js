var dispatchingInfo;




var ModelAndView = function( model, view ){
  this.model = model;
  this.view = view;
  this.setModel = function( m ){
    this.model = m;
  }
  this.setView = function( v ){
    this.view = v;
  }
}




exports.setDispatcher = function( path, file ){
  dispatchingInfo = require( "./dispatcher.json" );

  if( path ){
    if( file ){
      dispatchingInfo = require( path + "/" + file );
    } else{
      dispatchingInfo = require( path );
    }
  }
}

exports.getDispatcher = function(){
  return dispatchingInfo;
}

exports.dispatching = function( req ){

  var mav = new ModelAndView();

  // get req specifics
  var reqMethod = req.method;
  var reqUrl = req._parsedUrl;

  var reqOriginalUrl = req.originalUrl;
  var reqPath = reqUrl.pathname;
  var reqParam = req.params;
  var reqQuery = req.query;
  var reqBody = req.body;

  // get dispatchingInfo
  if( reqMethod.toUpperCase() === "GET" ){
    for( var i=0; i<dispatchingInfo.GET.length; i++ ){
      if( dispatchingInfo.GET[i].path === reqPath ){

        var controller;
        if( dispatchingInfo.GET[i].controllerPath ){
          controller = require( dispatchingInfo.GET[i].controllerPath + "/" + dispatchingInfo.GET[i].controller );
        } else{
          controller = require( dispatchingInfo.GET[i].controller );
        }

        var model = controller[ dispatchingInfo.GET[i].controlFunction ]( req );

        mav.setModel( model );
        mav.setView( dispatchingInfo.GET[i].viewPath + "/" + dispatchingInfo.GET[i].view );
        break;
      }
    }
  }

  return mav;
  // console.log( dispatchingInfo );

  // console.log( reqPath );
}

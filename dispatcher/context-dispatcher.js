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

  var os = "windows";

  if( path ){
    if( file ){
      if( os === "windows" ){
        dispatchingInfo = require( path + "\\" + file );
      } else{
        dispatchingInfo = require( path + "/" + file );
      }

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

        var model = controller[ dispatchingInfo.GET[i].controlFunction ]( req, dispatchingInfo.GET[i].dispatcherPath, dispatchingInfo.GET[i].dispatcher );

        mav.setModel( model );
        mav.setView( dispatchingInfo.GET[i].viewPath + "/" + dispatchingInfo.GET[i].view );
        break;
      }
    }
  } else if( reqMethod.toUpperCase() === "POST" ){
    for( var i=0; i<dispatchingInfo.POST.length; i++ ){
      if( dispatchingInfo.POST[i].path === reqPath ){

        var controller;
        if( dispatchingInfo.POST[i].controllerPath ){
          controller = require( dispatchingInfo.POST[i].controllerPath + "/" + dispatchingInfo.POST[i].controller );
        } else{
          controller = require( dispatchingInfo.POST[i].controller );
        }

        var model = controller[ dispatchingInfo.POST[i].controlFunction ]( req, dispatchingInfo.POST[i].dispatcherPath, dispatchingInfo.POST[i].dispatcher );

        mav.setModel( model );
        mav.setView( dispatchingInfo.POST[i].viewPath + "/" + dispatchingInfo.POST[i].view );
        break;
      }
    }
  }

  return mav;
  // console.log( dispatchingInfo );

  // console.log( reqPath );
}

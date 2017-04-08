exports.parsePath = function( path ){
  const os = require( "os" );

  if( os.type() === "Windows_NT" ){
    path = path.replace( "/", "\\" );
  } else{
    path = path.replace( "\\", "/" );
  }

  return path;
}

exports.ModelAndView = function( model, view ){
  this.model = model;
  this.view = view;
  this.setModel = function( m ){
    this.model = m;
  }
  this.setView = function( v ){
    this.view = v;
  }
}

exports.Pathes = function( dispatcherPath, dispatcherJS, controllerDispatcherPath, controllerDispatcherJS, servicerPath ){
  this.dispatcherPath = dispatcherPath;
  this.dispatcherJS = dispatcherJS;
  this.controllerDispatcherPath = controllerDispatcherPath;
  this.controllerDispatcherJS = controllerDispatcherJS;
  this.servicerPath = servicerPath;

  this.setDispatcherPath = function( p ){
    this.dispatcherPath = p;
  }
  this.setDispatcherJS = function( js ){
    this.dispatcherJS = js;
  }
  this.setControllerDispatcherPath = function( p ){
    this.controllerDispatcherPath = p;
  }
  this.setControllerDispatcherJS = function( js ){
    this.controllerDispatcherJS = js;
  }
  this.setServicerPath = function( p ){
    this.servicerPath = p;
  }
}

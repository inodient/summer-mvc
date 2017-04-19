exports.initStructure = function(){
  let common = require( "../common/common.js" );

  let initializer = require( "../properties/initializer.json" );
  let architecture = initializer[ "context_architecture" ];

  for( var i=0; i<architecture.length; i++ ){
    let folder = architecture[i].folder;

    if( getInitOption( "remove_and_rebuild" ) == "true" ){
        //makeBackup( folder );
        console.log( "remove_and_rebuild" );
    }

    for( var j=0; j<architecture[i].files.length; j++ ){
      let fileName = architecture[i].files[j];

      common.buildStructure( folder, fileName );
    }
  }
}

function getInitOption( option ){
  let initializer = require( "../properties/initializer.json" );
  let options = initializer[ "options" ];

  switch( option ) {
    case "use_service" :
      return String( options.use_service );
    case "remove_and_rebuild" :
      return String( options.remove_and_rebuild );
    default:
      return undefined;
  }
}

function makeBackup( folderName ){
  let common = require( "../common/common.js" );

  common.renameFolder( folderName );
}




exports.getViewEngine = function(){
  let initializer = require( "../properties/initializer.json" );

  return initializer[ "views" ].engine;
}

exports.getStaticFolders = function(){
  let initializer = require( "../properties/initializer.json" );

  return initializer[ "static_folders" ];
}




exports.getPort = function(){
  let initializer = require( "../properties/initializer.json" );

  return initializer[ "port" ];
}




exports.getContextDispatcherPath = function(){
  let path = require( "path" );

  return path.join( __dirname, "../", "dispatcher", "context_dispatcher.js" );
}

exports.getControllerDispatcherPath = function(){
  let path = require( "path" );
  let initializer = require( "../properties/initializer.json" );

  if( initializer[ "options" ].use_service == "true" ){
    return path.join( __dirname, "../", "dispatcher", "controller_dispatcher.js" );
  } else{
    return undefined;
  }
}

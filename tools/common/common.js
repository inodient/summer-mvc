const fs = require('fs');
const path = require('path');

exports.buildStructure = function( folder, fileName ){
  let destDir = path.join( __runningPath, folder );

  if( fileName ){
	  let src = path.join( __staticPath, folder, fileName );

    this.makeHierarchy( folder );

	  try{
		    fs.accessSync( path.join( destDir, fileName ) );
		  } catch( err ){
        console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[" + fileName + "] disappears. Copy File." );
		    this.copyFile( src, path.join( destDir, fileName) );
		  }
  } else{
    let src = path.join( __staticPath, folder );

    this.makeHierarchy( folder );
  }
}

exports.makeHierarchy = function( folder ){
  let folderHierarchy = path.join(folder).split( path.sep );

  let currentPath = __runningPath;

  try{
    for( var i=0; i<folderHierarchy.length; i++ ){
  	  if( folderHierarchy[i] != "" ){
  			currentPath = path.join( currentPath, folderHierarchy[i] )

  			this.makeFolder( currentPath );
  	  }
    }
  } catch( err ){
    throw err;
  }
}

exports.makeFolder = function( pathStr ){

  try{
    fs.accessSync( pathStr );
  } catch( err ) {
    console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[" + pathStr + "] disappears. Create Directory." );
    fs.mkdirSync( pathStr );
  }
}

exports.copyFile = function(src, dest) {

  let fs = require( "fs" );
  let data;

  try {
    data = require( "fs" ).readFileSync( src, "utf8" );
  } catch ( err ){
    throw err;
  }

  try{
    fs.writeFileSync( dest, data );
  } catch( err ){
    throw err;
  }
}

exports.renameFolder = function( folderName ){
  let fs = require( "fs" );
  let path = require( "path" );

  let oldPath = path.join( folderName );
  let newPath = path.join( folderName + "_backup" );

  try{
    fs.renameSync( oldPath, newPath )
  } catch( err ){
    console.log( err );
  }
}

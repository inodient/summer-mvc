exports.buildStructure = function( folder, fileName ){
  let fs = require('fs');
  let path = require('path');

  let src = path.join( __staticPath, folder, fileName );
  let destDir = path.join( __runningPath, folder );

  let folderHierarchy = path.join(folder).split( path.sep );

  let currentPath = __runningPath;
  
  for( var i=0; i<folderHierarchy.length; i++ ){
	  if( folderHierarchy[i] != "" ){
			currentPath = path.join( currentPath, folderHierarchy[i] )
			
			try{
			    fs.accessSync( currentPath );
			  } catch( err ){
			    console.log( "[" + currentPath + "] disappears. Create Directory." );
			    fs.mkdirSync( currentPath );
			  }
	  }  
  }


  try{
    fs.accessSync( path.join( destDir, fileName ) );
  } catch( err ){
    console.log( "[" + fileName + "] disappears. Copy File." );
    this.copyFile( src, path.join( destDir, fileName) );
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

exports.buildStructure = function( folder, fileName ){
  let fs = require('fs');
  let path = require('path');

  // __staticPath : ......../node-modules/summer-mvc/.....
  // __runningPath : ......../{user-project-name}/....
  let src = path.join( __staticPath, folder, fileName );
  let destDir = path.join( __runningPath, folder );

  try{
    fs.accessSync( destDir );
  } catch( err ){
    console.log( "[" + destDir + "] disappears. Create Directory." );
    fs.mkdirSync( destDir );
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

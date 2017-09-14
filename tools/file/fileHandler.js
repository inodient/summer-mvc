module.exports.uploadFile = uploadFile;
module.exports.downloadFile = downloadFile;




const path = require( "path" );
const fs = require( "fs" );

const Busboy = require( "busboy" );
const mime = require( "mime" );
const common = require( __common );





function uploadFile( req ){
  if( req.headers["content-type"] ){
    var i;
    var destDir = path.join( process.cwd() );

    for( i=1; i<arguments.length; i++ ){
      destDir = path.join( destDir, arguments[i].toString() );
      common.makeFolder( destDir );
    }

    logger.info( "destDir : " + destDir );

    return new Promise( function(resolve, reject){
      try{
        var busboy = new Busboy({ headers: req.headers });
        var resultObject = {};

        busboy.on( "file", function(fieldname, file, filename, encoding, mimetype){

          resultObject.destDir = destDir;
          resultObject.fieldname = fieldname;
          resultObject.file = file;
          resultObject.originalFileName = filename;
          resultObject.savedFileName = getSavedFileName() + "_" + filename;
          resultObject.encoding = encoding;
          resultObject.mimetype = mimetype;

          var saveTo = path.join( destDir, resultObject.savedFileName );
          logger.info( "Uploading : " + saveTo);

          file.pipe(fs.createWriteStream(saveTo));
        });

        busboy.on( "finish", function() {
          logger.info( "Upload complete" );
          resolve( resultObject );
        });

        req.pipe(busboy);
      } catch(err){
    	logger.error( err );
        reject( err );
      }
    } );
  }
}

function downloadFile( res, savedPath, savedFileName, originalFileName ){
  let fileSize, dest, mimeType;

  savedPath = path.join( __runningPath, savedPath );

  dest = path.join( savedPath, savedFileName );
  mimeType = mime.lookup( dest );

  logger.info( mimeType );
  
//  res.setHeader( "Content-disposition", "attachment;filename='TEST.txt'" );
//  res.setHeader( "Content-Transfer-Encoding", "binary" );
//  res.setHeader( "Content-type", mimeType );

  logger.info( "Download File : " + savedFileName );
  
  res.setHeader( "Content-disposition", "attachment;filename='TEST.txt'" );
  res.setHeader( "Content-Transfer-Encoding", "binary" );
  res.setHeader( "Content-type", mimeType );
  
  var fileStream = fs.createReadStream( dest );
  
  fileStream.on( "data", function(){
	  logger.info( "data" );
	  
//	  logger.info( arguments ); 
  });
  
  fileStream.on( "close", function(){
	  logger.info( "finish" );
	  
	  
	  
//	 logger.info( arguments ); 
  });

  fileStream.pipe( res );
  
  return { "originalFileName" : originalFileName, "savedPath" : savedPath, "savedFileName" : savedFileName };
}





function getSavedFileName(){
  var materials = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var savedFileName = "";

  for( let i=0; i<64; i++ ){
    savedFileName += materials.charAt( Math.floor(Math.random() * 64) % materials.length );
  }

  return savedFileName;
}
	
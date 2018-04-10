exports.control_get = function( req, res ){
  setModel( req, res );
}

exports.control = function( req, res ){
  return new Promise( function(resolve, reject){

    fileHandler.uploadFile( req, "test-upload-folder" )
    .then( function(results){
      var message = "** Uploaded File(s) **\n" + results.originalFileName;
      logger.debug( message );
      resolve( setModel(req, res, message) );
    } )
    .catch( function(err){
  	  reject( err );
    } );

  } );
}

exports.control_download = function( req, res ){

  return new Promise( function(resolve, reject){

    let downloadFileName = req.query.downloadFileName;
    let savedPath = "static";
    let savedFileName = 'test_download.txt';

    fileHandler.downloadFile( res, savedPath, savedFileName, downloadFileName + ".txt" )
    .then( function(results){
      var message = "** Downloaded File(s) **\n" + JSON.stringify( results, null, 4 );
      logger.debug( message );
      resolve( setModel(req, res, message) );
    } )
    .catch( function(err){
      reject( err );
    } )
  } );
}

function setModel( req, res, message ){
  // var queries = require( __mysqlQueries );
    var queries = queriesXML.queries.query;
  var model = {};

  try{
    model.method = req.method;
    model.path = req._parsedUrl.pathname;;
    model.queryString = JSON.stringify( req.query, null, 4 );
    model.params = JSON.stringify( req.params, null, 4 );

    model.message = message;
    model.queries = queries;

    return model;
  } catch( err ){
    throw err;
  }

}





// exports.control_get = function( req, res, callback ){
//   setModel( req, res, callback );
// }
//
// exports.control = function( req, res, callback ){
//   let file = new fileHandler();
//
//   file.uploadFile( req, "upload" );
//
//   callback( null, {} );
// }
//
// exports.control_download = function( req, res, callback ){
//   let file = new fileHandler();
//
//   let model = file.downloadFile( req, res );
//
//   callback( null, model );
// }
//
// function setModel( req, res, callback ){
//   var model = {};
//
//   try{
//     model.method = req.method;
//     model.path = req._parsedUrl.pathname;;
//     model.postMessage = "";
//     model.queryString = JSON.stringify( req.query, null, 4 );
//     model.params = JSON.stringify( req.params, null, 4 );
//     model.controllerName = require( "path" ).basename( __filename );
//     model.controlFunction = "control";
//     model.dbRes = "-";
//     model.ajaxResult = "-";
//
//     callback( null, model );
//   } catch( err ){
//     callback( err, model );
//   }
//
// }

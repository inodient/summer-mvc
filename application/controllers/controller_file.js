exports.control_get = function( req, res ){
  setModel( req, res );
}

exports.control = function( req, res ){
  fileHandler.uploadFile( req, "upload", "2017-06-05" )
  .then( function(results){
	  logger.info( results.originalFileName );
  })
  .catch( function(err){
	  throw err;
  });

  return {};
}

exports.control_download = function( req, res ){

  ////////////////////////////////////////////////
  // req getFileName
  // req getSavedPath getSavedFileName
  ////////////////////////////////////////////////

  let savedPath = "upload";
  //let savedFileName = "BpBouHaMCKy0vR2CWjuF0lAcBu1qtgs6IB1miSX24uombiAt5r45xm6OgYu2NhbY_(AD) 계정관리 DB의 SQL 계정 및 검증_170307.xlsx";
  let savedFileName = 'test.png';

  let model = fileHandler.downloadFile( res, savedPath, savedFileName, "asdf.png" );

  return model;
}

function setModel( req, res ){
  var model = {};

  try{
    model.method = req.method;
    model.path = req._parsedUrl.pathname;;
    model.postMessage = "";
    model.queryString = JSON.stringify( req.query, null, 4 );
    model.params = JSON.stringify( req.params, null, 4 );
    model.controllerName = require( "path" ).basename( __filename );
    model.controlFunction = "control";
    model.dbRes = "-";
    model.ajaxResult = "-";

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

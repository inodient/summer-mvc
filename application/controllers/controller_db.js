const pool = mysql.createPool( require( require("path").join(process.cwd(), "properties", "db.json") ) );

exports.control = function( req, res ){

  console.log( require("os").cpus().length );

  return new Promise( function(resolve, reject){
    getCurrentTime()
    .then( getDBVersion )
    .then( function( results ){
      resolve( setModel( req, res, results, null ) );
    } );
  } );
}

function getCurrentTime(){
  return new Promise( function(resolve, reject){
     pool.query( "select NOW(), CURDATE(), CURTIME()", function( err, results, fields ){
       console.log( results );
       resolve( results );
     } )
  } );
}

function getDBVersion(){
  return new Promise( function(resolve, reject){
    pool.query( "select * from connectionInfo", function( err, results, fields ){
      console.log( results );
      resolve( results );
    } )
  } );
}




// return new Prmoise Version
//
// exports.control = function( req, res ){
//   let db = new dbHandler();
//
//   const connectionInfo = require( require("path").join(process.cwd(), "properties", "db.json") );
//   const queries = require( require("path").join(process.cwd(), "queries", "query.json") );
//
//   const pool = mysql.createPool( connectionInfo );
//
//   return new Promise( function(resolve, reject){
//     let queryValues = [];
//     let callback = arguments[ arguments.length - 1 ];
//
//     for( var i=1; i<arguments.length-1; i++ ){
//       queryValues.push( arguments[i] );
//     }
//
//     // let queryString = this.getQueryString( arguments[0], queryValues );
//
//     queryString = "select Version()";
//
//     pool.query( queryString, function (error, results, fields) {
//       if (error) throw error;
//       // callback( error, results, fields );
//       console.log( results );
//       resolve( setModel( req, res, results, fields ) );
//     });
//   } );
// }



function setModel( req, res, results, fields ){
  var model = {};

  try{
    model.method = req.method;
    model.path = req._parsedUrl.pathname;;
    model.postMessage = "";
    model.queryString = JSON.stringify( req.query, null, 4 );
    model.params = JSON.stringify( req.params, null, 4 );
    model.controllerName = require( "path" ).basename( __filename );
    model.controlFunction = "control";
    model.dbRes = JSON.stringify( results[0], null, 4 );
    model.ajaxResult = "-";

    return model;
  } catch( err ){
    throw err;
  }

}





// exports.control = function( req, res, callback ){
//
//   db = new dbHandler();
//
//   if( callback ){
//
//     console.log( db.getQueryString( "getMySqlVersion" ) );
//
//     db.executeQuery( "getMySqlVersion", function( err, results, fields ){
//       setModel( req, res, results, fields, callback );
//     } );
//
//   }
//
//   this.db = null;
// }
//
//
//
// function setModel( req, res, results, fields, callback ){
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
//     model.dbRes = JSON.stringify( results[0], null, 4 );
//     model.ajaxResult = "-";
//
//     callback( null, model );
//   } catch( err ){
//     callback( err, model );
//   }
//
// }

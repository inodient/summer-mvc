/**
*
* @Controller
* @requestMapping /
* @requestMapping /index
* @params id : inodient
* @params password : iloveyou
*/
exports.control = function( req, res, next ){
  return new Promise( function(resolve, reject){

    setModel( req, res, next )
    .then( function(model){
      resolve( model );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}


// @controller
// @RequestMapping '/'
function setModel( req, res, next ){
  return new Promise( function(resolve, reject){

    var model = {};

    try{
      model.method = req.method;
      model.path = req._parsedUrl.pathname;;
      model.postMessage = "";
      model.queryString = JSON.stringify( req.query, null, 4 );
      model.params = JSON.stringify( req.params, null, 4 );
      model.controllerName = require( "path" ).basename( __filename );
      // model.controllerName = require( "path" ).basename( asdfasdfasdf );
      model.controlFunction = "control";
      model.dbRes = "-";
      model.ajaxResult = "-";

      resolve( model );
    } catch( err ){
      console.log( "controller_basic.js error" );
      reject( err );
    }
  } );
}

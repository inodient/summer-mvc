/*
* @controller("annotation_example_01")
* @controller-method("get")
* @controller-requestMapping("/annotation-example-01")
* @controller-viewPath("")
* @controller-view("index.ejs")
*/
exports.control = function( req, res ){
  return new Promise( function(resolve, reject){    

    setModel( req, res )
    .then( function(model){
      resolve( model );
    } )
    .catch( function(err){
      reject( err );
    } );

  } );
}


/*
* @controller("annotation_example_02")
* @controller-method("get")
* @controller-requestMapping("/annotation-example-02")
* @controller-viewPath("")
* @controller-view("index.ejs")
*/
exports.control_ = function( req, res ){
  return new Promise( function(resolve, reject){

	  setModel( req, res )
	    .then( function(model){
	      resolve( model );
	    } )
	    .catch( function(err){
	      reject( err );
	    } );
  } );
}


function setModel( req, res ){
  return new Promise( function(resolve, reject){

    // var queries = require( __mysqlQueries );
    var queries = queriesXML.queries.query;
    var model = {};

    try{
      model.method = req.method;
      model.path = req._parsedUrl.pathname;;
      model.queryString = JSON.stringify( req.query, null, 4 );
      model.params = JSON.stringify( req.params, null, 4 );

      model.queries = queries;
      model.message = "Default summer-mvc Test Request"

      resolve( model );
    } catch( err ){
      console.log( "controller_basic.js error" );
      reject( err );
    }
  } );
}

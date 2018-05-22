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
      // ;ub;oboubaf;osubdf;ausb
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

    var mysqlQueries = [];
    var mssqlQueries = [];

    var model = {};

    if( __mysqlHandlerUsage ){
      mysqlQueries = mysqlQueriesXML.queries.query;
    } 
    if( __mssqlHandlerUsage ){
      mssqlQueries = mssqlQueriesXML.queries.query;
    } 

    try{
      model.method = req.method;
      model.path = req._parsedUrl.pathname;;
      model.queryString = JSON.stringify( req.query, null, 4 );
      model.params = JSON.stringify( req.params, null, 4 );

      model.mysqlQueries = mysqlQueries;
      model.mssqlQueries = mssqlQueries;
      model.message = "Default summer-mvc Test Request"

      resolve( model );
    } catch( err ){
      console.log( "controller_basic.js error", err );
      reject( err );
    }
  } );
}

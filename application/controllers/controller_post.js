exports.control = function( req, res ){

  logger.debug( req.body.postMessage );

  return setModel( req, res, req.body.postMessage );
}


function setModel( req, res, message ){
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
      model.message = "Called Post Request with Text [" + message + "]";;

      resolve( model );
    } catch( err ){
      logger.error( "controller_post.js error", err );
      reject( err );
    }
  } );
}

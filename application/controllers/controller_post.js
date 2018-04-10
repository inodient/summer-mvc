exports.control = function( req, res ){

  logger.debug( req.body.postMessage );

  return setModel( req, res, req.body.postMessage );
}

function setModel( req, res, message ){
  // var queries = require( __mysqlQueries );
    var queries = queriesXML.queries.query;
  var model = {};

  try{
    model.method = req.method;
    model.path = req._parsedUrl.pathname;
    model.queryString = JSON.stringify( req.query, null, 4 );
    model.params = JSON.stringify( req.params, null, 4 );

    model.message = "Called Post Request with Text [" + message + "]";
    model.queries = queries;

    return model;
  } catch( err ){
    throw err;
  }
}

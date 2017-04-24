exports.control = function( req, res, callback ){

  db = new dbHandler();

  if( callback ){

    console.log( db.getQueryString( "getMySqlVersion" ) );

    db.executeQuery( "getMySqlVersion", function( err, results, fields ){
      setModel( req, res, results, fields, callback );
    } );

  }

  this.db = null;
}



function setModel( req, res, results, fields, callback ){
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

    callback( null, model );
  } catch( err ){
    callback( err, model );
  }

}

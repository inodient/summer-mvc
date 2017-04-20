exports.control = function( req, res, connection ){
  var model = {};

  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = JSON.stringify( req.query );
  model.params = JSON.stringify( req.params );
  model.contextDispatcher = "context_dispatcher.js"
  model.controllerDispatcher = "controller_dispatcher.js";
  model.servicer = "-";


  connection.setCookie( "userName", "changho kang" );

  // console.log( req.cookies );
  // console.log( response.getCookie(req, "userName") );
  // console.log( response.getCookie(req) );

  connection.setSession( "pass", "1234qwer@" );

  if( connection.getSession( "count") ){
    count = parseInt( connection.getSession( "count") );
  } else{
    count = 0;
  }

  count++;

  connection.setSession( "count", count );

  // req.session.password = "123qwer@";

  // console.log( req.session );
  console.log( connection.getSession( "count") );
  // console.log( connection.getSession(req) );



  return model;
}

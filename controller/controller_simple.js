exports.control = function( req, res ){
  var model = {};

  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = JSON.stringify( req.query );
  model.params = JSON.stringify( req.params );
  model.contextDispatcher = "context_dispatcher.js"
  model.controllerDispatcher = "controller_dispatcher.js";
  model.servicer = "-";


  connection.setCookie( res, "userName", "changho kang" );

  // console.log( req.cookies );
  // console.log( response.getCookie(req, "userName") );
  // console.log( response.getCookie(req) );

  connection.setSession( req, "pass", "1234qwer@" );

  if( connection.getSession(req, "count") ){
    count = parseInt( connection.getSession(req, "count") );
  } else{
    count = 0;
  }

  count++;

  connection.setSession( req, "count", count );

  // req.session.password = "123qwer@";

  // console.log( req.session );
  console.log( connection.getSession(req, "count") );
  // console.log( connection.getSession(req) );

  return model;
}

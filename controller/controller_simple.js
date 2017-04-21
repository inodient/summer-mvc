const db = require( "../common/dbHandler.js" );


exports.control = function( req, res, connection, controllerDispatcher, callback ){
  var servicer = "";

  // async.waterfall([
  //   function(cb){
  //     // callback(null, '하나', '둘');
  //     console.log( "1" );
  //     db.executeQuery( "getAccessLog", cb );
  //   },
  //
  //   function( results, fields, cb ){
  //     // callback(null, '셋');
  //     console.log( "2" );
  //     setModel( req, res, results, fields, cb );
  //   }
  // ], function (err, results) {
  //    // result에는 '끝'이 담겨 온다.
  //    console.log( "3" );
  //    console.log( "results : " + results );
  //    callback( null, results );
  // });

  if( callback ){
    console.log( "callback : exports.control" );
    console.log( callback );


    db.executeQuery( "getAccessLog", function( err, results, fields ){
      setModel( req, res, results, fields, callback );
    } );
  }
}



function setModel( req, res, results, fields, callback ){
  var model = {};

  model.method = req.method;
  model.path = req._parsedUrl.pathname;;
  model.queryString = results;
  model.params = fields;
  model.contextDispatcher = "context_dispatcher.js"
  model.controllerDispatcher = "controller_dispatcher.js";
  model.servicer = "-";

  callback( null, model );
}



// exports.control = function( req, res, connection ){
//   var model = {};
//
//   model.method = req.method;
//   model.path = req._parsedUrl.pathname;;
//   model.queryString = JSON.stringify( req.query );
//   model.params = JSON.stringify( req.params );
//   model.contextDispatcher = "context_dispatcher.js"
//   model.controllerDispatcher = "controller_dispatcher.js";
//   model.servicer = "-";
//
//
//   // connection.setCookie( "userName", "changho kang" );
//   //
//   // // console.log( req.cookies );
//   // // console.log( response.getCookie(req, "userName") );
//   // // console.log( response.getCookie(req) );
//   //
//   // connection.setSession( "pass", "1234qwer@" );
//   //
//   // if( connection.getSession( "count") ){
//   //   count = parseInt( connection.getSession( "count") );
//   // } else{
//   //   count = 0;
//   // }
//   //
//   // count++;
//   //
//   // connection.setSession( "count", count );
//   //
//   // // req.session.password = "123qwer@";
//   //
//   // // console.log( req.session );
//   // console.log( connection.getSession( "count") );
//   // // console.log( connection.getSession(req) );
//
//   setModel( model );
//
//   return model;
// }
//
// function setModel( model ){
//
//   let db = require( "../common/dbHandler.js" );
//
//   db.executeQuery( "getAccessLog", function( results ){
//      model.servicer = results;
//      console.log( model );
//   } );
// }

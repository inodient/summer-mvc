exports.getCookie = function( req ){

  if( arguments[1] ){
    return req.cookies[ arguments[1] ];
  } else{
    return req.cookies;
  }
}

exports.setCookie = function( res ){
  if( arguments[1] && arguments[2] ){
    res.cookie( arguments[1], arguments[2] );
  } else{
    return;
  }
}




exports.getSession = function( req ){
  if( arguments[1] ){
    return req.session[ arguments[1] ];
  } else{
    return req.session;
  }
}

exports.setSession = function( req ){
  if( arguments[1] && arguments[2] ){
    console.log( typeof req.session );

    console.log( arguments[1] );
    console.log( arguments[2] );

    req.session[ arguments[1] ] = arguments[2];
  }
}

exports.destroySession = function( req ){
  req.session = null;
}

module.exports.getCookie = getCookie;
module.exports.setCookie = setCookie;
module.exports.clearCookie = clearCookie;

module.exports.getSession = getSession;
module.exports.setSession = setSession;
module.exports.destroySession = destroySession;
module.exports.setSessionTimeout = setSessionTimeout
module.exports.setSessionExpire = setSessionExpire;


function getCookie( req, res ){
  if( arguments[2] ){
    return req.cookies[ arguments[2] ];
  } else{
    return req.cookies;
  }
}

function setCookie( req, res ){
  if( arguments[2] && arguments[3] ){
    res.cookie( arguments[2], arguments[3] );
  } else{
    return;
  }
}

function clearCookie( req, res ){
  if( arguments[2] ){
    res.clearCookie( arguments[2] );
  } else{
    return;
  }
}




function getSession( req, res ){
  if( arguments[2] ){
    return req.session[ arguments[2] ];
  } else{
    return req.session;
  }
}

function setSession( req, res ){
  if( arguments[2] && arguments[3] ){
    req.session[ arguments[2] ] = arguments[3];
  } else{
    return;
  }
}

function destroySession( req, res ){
  req.session.destroy( function(err){
    req.session = null;
  });
}

function setSessionTimeout( req, res, maxAge ){
  req.session.cookie.maxAge = maxAge;
}

function setSessionExpire( req, res, expireDate ){
  req.session.expires = expireDate;
}

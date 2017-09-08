module.exports.getCookie = getCookie;
module.exports.setCookie = setCookie;
module.exports.clearCookie = clearCookie;

module.exports.getSession = getSession;
module.exports.setSession = setSession;
module.exports.destroySession = destroySession;
module.exports.setSessionTimeout = setSessionTimeout
module.exports.setSessionExpire = setSessionExpire;


  function getCookie( req, res ){
    if( arguments[0] ){
      return req.cookies[ arguments[0] ];
    } else{
      return req.cookies;
    }
  }

  function setCookie( req, res ){
    if( arguments[0] && arguments[1] ){
      res.cookie( arguments[0], arguments[1] );
    } else{
      return;
    }
  }

  function clearCookie( req, res ){
    if( arguments[0] ){
      res.clearCookie( arguments[0] );
    } else{
      return;
    }
  }




  function getSession( req, res ){
    if( arguments[0] ){
      return req.session[ arguments[0] ];
    } else{
      return req.session;
    }
  }

  function setSession( req, res ){
    if( arguments[0] && arguments[1] ){
      req.session[ arguments[0] ] = arguments[1];
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


exports.connection = function( req, res ){
  this.req = req;
  this.res = res;

  this.getCookie = function(){
    if( arguments[0] ){
      return req.cookies[ arguments[0] ];
    } else{
      return req.cookies;
    }
  }

  this.setCookie = function(){
    if( arguments[0] && arguments[1] ){
      res.cookie( arguments[0], arguments[1] );
    } else{
      return;
    }
  }

  this.clearCookie = function(){
    if( arguments[0] ){
      res.clearCookie( arguments[0] );
    } else{
      return;
    }
  }




  this.getSession = function(){
    if( arguments[0] ){
      return req.session[ arguments[0] ];
    } else{
      return req.session;
    }
  }

  this.setSession = function(){
    if( arguments[0] && arguments[1] ){
      req.session[ arguments[0] ] = arguments[1];
    } else{
      return;
    }
  }

  this.destroySession = function(){
    req.session.destroy( function(err){
      req.session = null;
    });
  }

  this.setSessionTimeout = function( maxAge ){
    req.session.cookie.maxAge = maxAge;
  }

  this.setSessionExpire = function( expireDate ){
    req.session.expires = expireDate;
  }
}

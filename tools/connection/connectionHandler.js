exports.body = function(){
	this.req;
	this.res;
	
	this.setConnectionInfo = function( req, res ){
		return new Promise( function(resolve, reject){
			try{
				this.req = req;
				this.res = res;
				
				logger.info( "Connection Handler Prepared" );
				
				resolve( {"status":"S"} );
			} catch( err ){
				reject( err );
			}
		} );
	}
	
	this.getCookie = function(){
		var argv = arguments[0];
		
		return new Promise( function(resolve, reject){
			try{
				if( argv ){
					resolve( this.req.cookies[ argv ] );
				  } else{
				    resolve( this.req.cookies );
				  }
			} catch( err ){
				reject( err );
			}
		} );
	}
	
	this.setCookie = function(){
		return new Promise( function(resolve, reject){
			try{
				if( arguments[0] && arguments[1] ){
					this.res.cookie( arguments[0], arguments[1] );
				  } 
				resolve();
			} catch( err ){
				reject( err );
			}
			
		} );
	}
	
	this.clearCookie = function(){
		return new Promise( function(resolve, reject){
			try{
				if( arguments[0] ){
					this.res.clearCookie( arguments[0] );
				  }
				resolve();
			} catch( err ){
				reject( err );
			}
		} );
	}
	
	
	
	
	this.getSession = function(){
		return new Promise( function(resolve, reject){
			try{
				if( arguments[0] ){
				    resolve( this.req.session[ arguments[0] ] );
				  } else{
				    resolve( req.session );
				  }
			} catch( err ){
				reject( err );
			}
		} );
	}
	
	this.setSession = function(){
		return new Promise( function(resolve, reject){
			try{
				if( arguments[0] && arguments[1] ){
				    this.req.session[ arguments[0] ] = arguments[1];
				  }
				
				resolve();
			} catch( err ){
				reject( err );
			}
		} );
	}
	
	this.destroySession = function(){
		return new Promise( function(resolve, reject){
			try{
				this.req.session.destroy( function(err){
				    this.req.session = null;
				  });
				
				resolve();
			} catch( err ){
				reject( err );
			}
		} );
	}
	
	this.setSessionTimeout = function( maxAge ){
		return new Promise( function(resolve, reject){
			try{
				this.req.session.cookie.maxAge = maxAge;
			} catch( err ){
				reject( err );
			}
		} );
	}
	
	this.setSessionExpire = function( expireDate ){
		return new Promise( function(resolve, reject){
			try{
				this.req.session.expires = expireDate;
				resolve();
			} catch( err ){
				reject( err );
			}
		});
	}
}

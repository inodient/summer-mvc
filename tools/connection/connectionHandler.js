module.exports = function( req, res ){
	
	try{
		this.req = req;
		this.res = res;
		logger.info( "Connection Handler Initialized" );
	} catch( err ){
		throw err;
	}
	
	
	
	
	
	// Cookie Functions - Start
	this.getCookie = function( key, callback ){
		if( (typeof callback) === "function" ){
			try{
				if( key ){
					callback( this.req.cookies[ key ], null );
				} else{
					callback( this.req.cookies, null );
				}
			} catch( err ){
				logger.error( err );
				callback( {"status":"E"}, err );
			}
		} else{
			try{
				if( key ){
					return this.req.cookies[ key ];
				} else{
					return this.req.cookies;
				}
			} catch( err ){
				throw err;
			}
		}
	}

	this.setCookie = function( key, value, callback ){
		if( (typeof callback) === "function" ){
			try{
				this.res.cookie( key, value );
				callback( {"status":"S"}, null );
			} catch( err ){
				callback( {"status":"E"}, err );
			}
			
		} else{
			try{
				this.res.cookie( key, value );
			} catch( err ){
				throw err;
			}
		}
	}
	

	this.clearCookie = function( key, callback ){
		if( (typeof callback) === "function" ){
			try{
				if( key ){
					this.res.clearCookie( key );
				}
				callback( {"status":"S"}, null );
			} catch( err ){
				callback( {"status":"E"}, err );
			}
		} else{
			try{
				if( key ){
					this.res.clearCookie( key );
				}
			} catch( err ){
				throw err;
			}
		}
	}
	// Cookie Functions - End



	
	
	// Session Functions - Start
	this.getSession = function( key ){
		return new Promise( function(resolve, reject){
			try{
				if( key ){
				    resolve( this.req.session[ key ] );
				  } else{
				    resolve( this.req.session );
				  }
			} catch( err ){
				reject( err );
			}
		} );
	}

	this.setSession = function( key, value ){
		return new Promise( function(resolve, reject){
			try{
				if( key && value ){
				    this.req.session[ key ] = value;
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
						if( err ) reject( err );
						resolve();
			  });
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
	// Session Functions - End	
}

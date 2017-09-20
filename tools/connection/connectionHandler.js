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
					callback( this.req.cookies[ key ] );
				} else{
					callback( this.req.cookies );
				}
			} catch( err ){
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
				callback( {"status":"S"} );
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



	
	
	//https://github.com/tj/connect-redis/blob/master/lib/connect-redis.js
	//http://mythinkg.blogspot.kr/2016/01/nodejs-redis-rediss-session.html

	// Helper Functions - Start
	function _getCallback( arguments ){
		try{
			if( arguments.length > 0 && (typeof arguments[arguments.length - 1]) === "function" ){
				return arguments[ arguments.length - 1 ];
			} else{
				return undefined;
			}
		} catch( err ){
			throw err;
		}
	}
	
	function _getValueArguments( arguments ){
		try{
			if( arguments.length > 1 ){
				
				if( (typeof arguments[arguments.length-1]) === "function" ){
					delete arguments[ arguments.length - 1 ];
				}
				return arguments;
				
			} else{
				return undefined;
			}
		} catch( err ){
			throw err;
		}
	}
	// Helper Functions - End
	
	
	// Session Functions - Start
	this.getSession = function(){ // arguments : key, callback
		
		try{
			var key = undefined;
			
			var callback = _getCallback( arguments );
			var argv = _getValueArguments( arguments );
			
			if( argv ){
				key = argv[0];
			}
			
			if( callback ){
				if( key ){
					callback( req.session[ key ] )
				} else{
					callback( req.session )
				}
			} else{
				throw "IllegalArgumentException : callback dismissed";
			}
		} catch( err ){
			if( callback ){
				callback( null, err );
			} else{
				throw err;
			}
		}
	}
	
	this.setSession = function(){ // arguments : key, value, (callback)
		
		try{
			var key = undefined;
			var value = undefined;
			
			var callback = _getCallback( arguments );
			var argv = _getValueArguments( arguments );
			
			if( argv ){
				key = argv[0];
				value = argv[1];
			}
			
			if( key && value ){
				req.session[ key ] = value;
				
				if( callback ){
					callback( "Set Session Value Succeed" );
				}
			} else{
				throw "IllegalArgumentError : not enough arguments";
			}
			
		} catch( err ){
			if( callback ){
				callback( null, err );
			} else{
				throw err;
			}
		}
	}
	
	this.destroySession = function(){ // arguments : (callback)
		try{
			var callback = _getCallback( arguments );
			
			if( callback ){
				req.session.destroy( function(err){
					if( err ) callback( err );
				} );
			} else{
				req.session.destroy( function(err){
					if( err ) throw err;
				} );
			}
		} catch( err ){
			if( callback ){
				callback( null, err );
			} else{
				throw err;
			}
		}
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

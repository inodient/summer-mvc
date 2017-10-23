module.exports = function( req, res ){

	try{
		this.req = req;
		this.res = res;
	} catch( err ){
		throw err;
	}





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
			if( arguments.length >= 1 ){

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





	// Cookie Functions - Start
	this.getCookie = function(){ // arguments : (key), (callback)
		try{
			var key = undefined;

			var callback = _getCallback( arguments );
			var argv = _getValueArguments( arguments );

			if( argv ){
				key = argv[0];
			}

			if( key ){
				if( callback ){
					callback( decodeURI(this.req.cookies[key]) );
				} else{
					return this.req.cookies[key];
				}
			} else{
				if( callback ){
					var cookies = [];
					
					for( name in this.req.cookies ){
						key = name;
						var value = this.req.cookies[name];
						
						key = decodeURI( key );
						value = decodeURI( value );
						
						cookies.push( {key:key, value:value} );
					}
					
					logger.debug( "cookies", cookies );
					callback( cookies );
				} else{
					return this.req.cookies;
				}
			}

		} catch( err ){
			if( callback ){
				callback( null, err );
			} else{
				throw( err );
			}
		}
	}

	this.setCookie = function(){ // arguments : key, value, (callback)
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
				res.cookie( encodeURI(key), encodeURI(value) );

				if( callback ){
					callback( {key:key, value:value}, null );
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

	this.clearCookie = function(){ // arguments :  key, (callback)
		try{
			var key = undefined;

			var callback = _getCallback( arguments );
			var argv = _getValueArguments( arguments );

			if( argv ){
				key = argv[0];
			}

			if( key ){
				this.res.clearCookie( key );
			} else{
				throw "IllegalArgumentError : not enough arguments";
			}
		} catch( err ){
			if( callback ){
				callback( err );
			} else{
				throw err;
			}
		}
	}
	// Cookie Functions - End





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
			} else{
				throw "IllegalArgumentError : not enough arguments";
			}

		} catch( err ){
			if( callback ){
				callback( err );
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
				callback( err );
			} else{
				throw err;
			}
		}
	}

	this.regenerateSession = function(){ // arguments : (callback)
		try{
			var callback = _getCallback( arguments );

			if( callback ){
				req.session.regenerate( function(err){
					if( err ) callback( err );
				} );
			} else{
				req.session.regenerate( function(err){
					if( err ) throw err;
				} );
			}
		} catch( err ){
			if( callback ){
				callback( err );
			} else{
				throw err;
			}
		}
	}

	this.reloadSession = function(){ // arguments : (callback)
		try{
			var callback = _getCallback( arguments );

			if( callback ){
				req.session.reload( function(err){
					if( err ) callback( err );
				} );
			} else{
				req.session.reload( function(err){
					if( err ) throw err;
				} );
			}
		} catch( err ){
			if( callback ){
				callback( err );
			} else{
				throw err;
			}
		}
	}

	this.saveSession = function(){ // arguments : (callback)
		try{
			var callback = _getCallback( arguments );

			if( callback ){
				req.session.save( function(err){
					if( err ) callback( err );
				} );
			} else{
				req.session.save( function(err){
					if( err ) throw err;
				} );
			}
		} catch( err ){
			if( callback ){
				callback( err );
			} else{
				throw err;
			}
		}
	}

	this.touchSession = function(){ // arguments : (callback)
		try{
			var callback = _getCallback( arguments );

			req.session.touch();
		} catch( err ){
			if( callback ){
				callback( err );
			} else{
				throw err;
			}
		}
	}

	this.setSessionTimeout = function(){ // arguments : maxAge, (callback)
		try{
			var maxAge = undefined;

			var callback = _getCallback( arguments );
			var argv = _getValueArguments( arguments );

			if( argv ){
				maxAge = argv[0];
			}

			if( maxAge ){
				req.session.cookie.maxAge = maxAge;
			} else{
				throw "IllegalArgumentError : not enough arguments";
			}
		} catch( err ){
			if( callback ){
				callback( err );
			} else{
				throw err;
			}
		}
	}

	this.setSessionExpire = function(){ // arguments : expireDate, (callback)
		try{
			var expireDate = undefined;

			var callback = _getCallback( arguments );
			var argv = _getValueArguments( arguments );

			if( argv ){
				expireDate = argv[0];
			}

			if( expireDate ){
				req.session.cookie.expireDate = expireDate;
			} else{
				throw "IllegalArgumentError : not enough arguments";
			}
		} catch( err ){
			if( callback ){
				callback( err );
			} else{
				throw err;
			}
		}
	}
	// Session Functions - End
}

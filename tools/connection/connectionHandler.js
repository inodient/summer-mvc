exports.body = function( req, res ){

	this.req;
	this.res;

	// this.setConnectionInfo = function( req, res ){
	// 	return new Promise( function(resolve, reject){
	// 		try{
	// 			this.req = req;
	// 			this.res = res;
	//
	// 			logger.info( "Connection Handler Prepared" );
	//
	// 			resolve( {"status":"S"} );
	// 		} catch( err ){
	// 			reject( err );
	// 		}
	// 	} );
	// }

	this.setConnectionInfo = function( req, res ){
			try{
				this.req = req;
				this.res = res;

				logger.info( "Connection Handler Prepared" );
			} catch( err ){
				throw err;
			}

	}

	// this.getCookie = function( key ){
	// 	console.log( this.req.cookies );
	//
 // 		return new Promise( function(resolve, reject){
	//
	// 		try{
	// 			if( key ){
	// 				resolve( this.req.cookies[ key ] );
	// 		  } else{
	// 		    resolve( this.req.cookies );
	// 		  }
	// 		} catch( err ){
	// 			reject( err );
	// 		}
	// 	} );
	// }

	this.getCookie = function( key, callback ){
		console.log( key, callback );

		if( key ){
			callback( this.req.cookies[ key ] );
		} else{
			callback( this.req.cookies );
		}
	}

	this.setCookie = function( key, value ){
		return new Promise( function(resolve, reject){
			try{
				if( key && value ){
					this.res.cookie( key, value );
				  }
				resolve( {"status":"S"} );
			} catch( err ){
				reject( err );
			}

		} );
	}

	this.clearCookie = function( key ){
		return new Promise( function(resolve, reject){
			try{
				if( key ){
					this.res.clearCookie( key );
			  }
				resolve();
			} catch( err ){
				reject( err );
			}
		} );
	}




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
}

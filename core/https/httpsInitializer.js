exports.getHttpsCertifications = getHttpsCertifications;




function getHttpsCertifications(){
	try {
		// get https information
		var fs = require( "fs" );
		var initInfo = require( __initInfo );

		var privateKey  = null;
		var certificate = null;

		var credentials = null;

		if( fs.existsSync( require("path").join( __httpsKeyFilePath) ) && fs.existsSync( require("path").join( __httpsCertFilePath) ) ){
			privateKey  = fs.readFileSync( require("path").join( __httpsKeyFilePath), 'utf8');
			certificate = fs.readFileSync( require("path").join( __httpsCertFilePath), 'utf8');

			credentials = { key: privateKey, cert: certificate }; 
		} else {
			credentials = { "status":"error", "message":"Unexpected HTTPS Credentials" };
		}

		return credentials;
	} catch( err ){
		console.log( err );
		return err;
	}
}
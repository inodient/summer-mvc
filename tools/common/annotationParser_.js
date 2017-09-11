module.exports.parseController = parseController;





const fs = require( "fs" );
const path = require( "path" );





function parseController(){
	return new Promise( function(resolve, reject){
		getControllerFileList()
		.then( readFiles )
		.then( function(){
			resolve();
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

function readFiles( files ) {
	return new Promise( function(resolve, reject){
		
		var promises = [];
		var stack = [];
		
		
		for( var i=0; i<files.length; i++ ){
			var annoInfo = new annotationInfo();
			promises.push( readLines(files[i], stack, annoInfo) );
		}
		
		Promise.all( promises )
		.then( function(){
			resolve();
		})
		.catch( function(err){
			reject( err );
		})
	} );	
}

function readLines( file, stack, annoInfo ){
	return new Promise( function(resolve, reject){
		var controllerDir = path.join( __controllerPath );
		controllerDir = path.join( __runningPath, controllerDir );
		
		try{
			var input = fs.createReadStream( path.join(controllerDir, file) );
			var lineArr = [];
			var arrAnnotation = [];
			
			var remaining = "";
			
			input.on( "data", function(data){
				remaining += data;
				
				var index = remaining.indexOf( "\n" );
				
				while( index > -1 ){
					var line = remaining.substring( 0, index );
					remaining = remaining.substring( index + 1 );
					
					if( ( analyzeLine( file, line, stack, annoInfo ) )["content"] != "" ){
						lineArr.push( analyzeLine( file, line, stack, annoInfo ) );
					}
					
					index = remaining.indexOf( "\n" );
				}
				
				console.log( lineArr );
				
				resolve( lineArr );
			} );
			
			input.on( "error", function(err){
				reject( err );
			} );
			
			input.on( "end", function(){
				if( remaining.length > 0 ){
					console.log( remaining );
				}
			} );
		} catch( err ){
			logger.error( err.stack );
			reject( err );
		}
	} );
}

function analyzeLine( file, lineStr, stack, annoInfo ){
	
	try{
		var line = new lineInfo();
		
		lineStr = lineStr.replace(/^\s+|\s+$/g,'');
		
		if( lineStr.indexOf( "//" ) === 0 
				|| lineStr.indexOf( "/*" ) === 0 
				|| lineStr.indexOf( "*/" ) >= 0 ){
			
			line.type = "comment";
//			var parsingRes = annotationParser( file, lineStr );
//			
//			for( name in parsingRes ){
//				annoInfo[ name ] = parsingRes[ name ];
//			}
			
			if( lineStr.indexOf( "/*" ) === 0 ){
				stack.push( "/*" );
			}
			
			if( lineStr.indexOf( "*/" ) >= 0 ){
				if( stack[ stack.length - 1 ] === "/*" ){
					stack.pop();
				}
			}
			
			line.content = lineStr;
		} else{
			
			if( stack[ stack.length - 1 ] === "/*" ){
				line.type = "comment";
				line.content = lineStr;
//				var parsingRes = annotationParser( file, lineStr );
//				
//				for( name in parsingRes ){
//					annoInfo[ name ] = parsingRes[ name ];
//				}
				
			} else{
				line.type = "function";
				
				if( lineStr.indexOf("{") >= 0 ){
					stack.push( "{" );
					
					if( stack.length == 1 ){
						line.content = lineStr;
					}
				}
				if( lineStr.indexOf("}") >= 0 ){
					stack.pop();
				}
			}
		}

		
		
		return line;
	} catch( err ){
		console.error( err );
	}
}






function getControllerFileList(){
	return new Promise( function(resolve, reject){
		var controllerDir = path.join( __controllerPath );
		controllerDir = path.join( __runningPath, controllerDir );

		fs.readdir( controllerDir, (err, files) => {
			if( err ) reject( err );
			resolve( files );
		});
	} );
}

function annotationParser( file, comment ){
	if( comment.indexOf( "@controller" ) > 0 ){
		var arrComment = comment.split( "@controller" );
		var id = (arrComment[ arrComment.length - 1 ]).replace(/^\s+|\s+$/g,'');
		
		return { "id" : id, "controllerJS" : file };
	} 
}




function lineInfo(){
	this.type = "";
	this.content = "";
}


function annotationInfo(){
	this.method = "";
	this.id = "";
	this.path = "";
	this.controllerJS = "";
	this.controlFunction = "";
	this.viewPath = "";
	this.view = "";
}
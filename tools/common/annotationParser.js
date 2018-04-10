module.exports.parseComponent = parseComponent;





const fs = require( "fs" );
const path = require( "path" );




function parseComponent(){
  return new Promise( function(resolve, reject){

    resolve( {"status" : "ignored"} );

	  // parser( "controller" )
	  // .then( function(res){
		 //  resolve( res );
	  // } )
	  // .catch( function(err){
		 //  reject( err );
	  // } );

//    var promises = [];
//
//    promises.push( parser("controller") );
//    promises.push( parser("service") );
//
//    Promise.all( promises )
//    .then( function(res){
//      resolve( res );
//    } )
//    .catch( function(err){
//  	  console.log( "ERROR OCCURED..." );
//      reject( err );
//    } );
  } );
}

function parser( type ){
  return new Promise( function(resolve, reject){
    getFileList( type )
    .then( function(files){

      var promises = [];

      for( var i=0; i<files.length; i++ ){
        var preparation = [];
        promises.push( getLineInfo(type, files[i], preparation) );
      }

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        var subPromises = [];

        for( var j=0; j<argv.length; j++ ){
          subPromises.push( getAnnotation(argv[j]) );
        }

        Promise.all( subPromises )
        .then( function(res){
          var subArgv = arguments[0];

          var writePromises = [];

          for( var k=0; k<subArgv.length; k++ ){
            if( subArgv[k].length > 0 ){

              writePromises.push( writeDispatcher( subArgv[k] ) );
            }
          }

          Promise.all( writePromises )
          .then( function(){
        	  resolve( "Success");
          })
          .catch( function(err){
        	  reject( err );
          } );
        } )
        .catch( function(err){
          reject( err );
        } );

      } )
      .catch( function(err){
        reject( err );
      } );

    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}




// 1. Get File List
function getFileList( type ){
  return new Promise( function(resolve, reject){

    var destPath = _getComponentPath( type );

    fs.readdir( destPath, (err, files) => {
      if( err ) reject( err );
      resolve( files );
    });
  } );
}

function _getComponentPath( type ){
  if( type == "controller" ){
    var controllerDir = path.join( __controllerPath );
    controllerDir = path.join( __runningPath, controllerDir );
    destPath = controllerDir;

  } else if( type == "service" ){
    var serviceDir = path.join( __servicePath );
    serviceDir = path.join( __runningPath, serviceDir );
    destPath = serviceDir;
  }

  return destPath;
}

// 2. Get line information
function getLineInfo( type, file, preparation ){
  return new Promise( function(resolve, reject){
    var destPath = _getComponentPath( type );

		try{
			var input = fs.createReadStream( path.join(destPath, file) );
			var remaining = "";

			input.on( "data", function(data){
        var arrLine = [];

        remaining += data;
        var index = remaining.indexOf( "\n" );

				while( index > -1 ){
					var lineStr = remaining.substring( 0, index );
          lineStr = lineStr.replace(/^\s+|\s+$/g,'');

          var annoType = _getAnnoType( lineStr );

          arrLine.push( new line( file, lineStr, _getAnnoType(lineStr), 0 ) );

					remaining = remaining.substring( index + 1 );
					index = remaining.indexOf( "\n" );
				}
				resolve( arrLine );
			} );

			input.on( "error", function(err){
        console.log( err );
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

function _getAnnoType( lineStr ){
  try{
    if( lineStr.indexOf( "//" ) === 0
    		|| lineStr.indexOf( "/*" ) === 0
    		|| lineStr.indexOf( "*/" ) >= 0 ){

      return "comment";

    } else if( lineStr.length == 0 ){
      return "empty";

    } else{
      return "function";

    }
  } catch( err ){
    throw err;
  }
}

// 3. Get annotation
function getAnnotation( lines ){
  return new Promise( function(resolve, reject){

    try{
      // Check Comment
      for( var i=1; i<lines.length; i++ ){
        if( lines[i-1].lineStr.indexOf( "/*" ) == 0 ){
          lines[i].annoType = "comment_cont";
        }
        if( lines[i-1].annoType == "comment_cont" && lines[i].annoType == "function" ){
          lines[i].annoType = "comment_cont";
        }
        if( lines[i-1].annoType == "comment_cont" && lines[i].lineStr.indexOf( "*/" ) > 0 ){
          lines[i].annoType = "comment_end";
        }
      }

      // Erase Empty
      var newLines = [];
      for( var i=0; i<lines.length; i++ ){
        if( lines[i].annoType != "empty" ){
          newLines.push( lines[i] );
        }
      }

      // Create annotation property
      for( var i=0; i<newLines.length; i++ ){
        if( newLines[i].lineStr.indexOf( "@controller(" ) > 0 ){
          newLines[i].lineStr = _erasePreTerms( newLines[i].lineStr );
          newLines[i].lineStr = _getAnnotationProperty( newLines[i].lineStr, "@controller(" );
          newLines[i].annoType = "anno-property-id";
        }
        if( newLines[i].lineStr.indexOf( "@controller-method" ) > 0 ){
          newLines[i].lineStr = _erasePreTerms( newLines[i].lineStr );
          newLines[i].lineStr = _getAnnotationProperty( newLines[i].lineStr, "@controller-method" );
          newLines[i].annoType = "anno-property-method";
        }
        if( newLines[i].lineStr.indexOf( "@controller-requestMapping" ) > 0 ){
          newLines[i].lineStr = _erasePreTerms( newLines[i].lineStr );
          newLines[i].lineStr = _getAnnotationProperty( newLines[i].lineStr, "@controller-requestMapping" );
          newLines[i].annoType = "anno-property-requestMapping";
        }
        if( newLines[i].lineStr.indexOf( "@controller-viewPath" ) > 0 ){
          newLines[i].lineStr = _erasePreTerms( newLines[i].lineStr );
          newLines[i].lineStr = _getAnnotationProperty( newLines[i].lineStr, "@controller-viewPath" );
          newLines[i].annoType = "anno-property-viewPath";
        }
        if( newLines[i].lineStr.indexOf( "@controller-view" ) > 0 ){
          newLines[i].lineStr = _erasePreTerms( newLines[i].lineStr );
          newLines[i].lineStr = _getAnnotationProperty( newLines[i].lineStr, "@controller-view" );
          newLines[i].annoType = "anno-property-view";
        }

        if( newLines[i].annoType == "function" ){
          if( newLines[i].lineStr.indexOf( "exports" ) >= 0 ){
              newLines[i].lineStr = _getFunctionName( newLines[i].lineStr );
              newLines[i].annoType = "anno-func";
          }
        }
      }

      // Erase uninformed line
      var arrAnnotation = [];
      for( var i=0; i<newLines.length; i++ ){
        if( newLines[i].annoType.indexOf( "anno-" ) >= 0 ){
          arrAnnotation.push( newLines[i] );
        }
      }

      // Indexing
      var annoFunctionLocation = -1;
      for( var i=0; i<arrAnnotation.length; i++ ){
        if( arrAnnotation[i].annoType == "anno-func" ){
          var startIndex = annoFunctionLocation + 1;
          annoFunctionLocation = i;

          for( var j=startIndex; j<=i; j++ ){
            arrAnnotation[j].index = startIndex;
          };
        }
      }

      // Erase unannotated function
      var arrAnnotationCondensed = [];
      for( var i=0; i<arrAnnotation.length; i++ ){
        if( arrAnnotation[i].annoType == "anno-func" ){
          if( i > 0 ){
            if( arrAnnotation[i-1].annoType.indexOf( "anno-property" ) >= 0 ){
              arrAnnotationCondensed.push( arrAnnotation[i] );
            }
          }
        } else {
          arrAnnotationCondensed.push( arrAnnotation[i] );
        }
      }

      // create annoInfo
      var startIndex = 0;
      var annotations = [];

      for( var i=0; i<arrAnnotationCondensed.length; i++ ){
        if( arrAnnotationCondensed[i].annoType == "anno-func" ){

          var tempAnno = new annotation();

          tempAnno.controlFunction = arrAnnotationCondensed[i].lineStr;
          tempAnno.controllerJS = arrAnnotationCondensed[i].componentFileName;

          for( var j=startIndex; j<i; j++ ){
            if( arrAnnotationCondensed[j].annoType == "anno-property-method" ){
              tempAnno.method = arrAnnotationCondensed[j].lineStr;
            }
            if( arrAnnotationCondensed[j].annoType == "anno-property-id" ){
              tempAnno.id = arrAnnotationCondensed[j].lineStr;
            }
            if( arrAnnotationCondensed[j].annoType == "anno-property-requestMapping" ){
              tempAnno.path = arrAnnotationCondensed[j].lineStr;
            }
            if( arrAnnotationCondensed[j].annoType == "anno-property-viewPath" ){
              tempAnno.viewPath = arrAnnotationCondensed[j].lineStr;
            }
            if( arrAnnotationCondensed[j].annoType == "anno-property-view" ){
              tempAnno.view = arrAnnotationCondensed[j].lineStr;
            }
          }

          annotations.push( tempAnno );
        }
      }

      resolve( annotations );
    } catch( err ){
      reject( err );
    }
  } );
}

function _erasePreTerms( lineStr ){
  var startIndex = lineStr.indexOf( "@" );

  return lineStr.substring( startIndex, lineStr.length );
}

function _getAnnotationProperty( lineStr, property ){
  var startIndex = lineStr.indexOf( property );
  var endIndex = startIndex + property.length;

  lineStr = lineStr.substring( endIndex, lineStr.length );

  lineStr = lineStr.replace( /\(/gi, "" );
  lineStr = lineStr.replace( /\)/gi, "" );
  lineStr = lineStr.replace( /\"/gi, "" );

  return lineStr;
}

function _getFunctionName( lineStr ){
  lineStr = lineStr.split( "exports." )[1];
  lineStr = lineStr.split( "=" )[0];
  lineStr = lineStr.replace( / /gi, "" );

  return lineStr;
}

function writeDispatcher( annotations ){
  return new Promise( function(resolve, reject){

    try{
      var dispatchingInfo = require( __contextDispatchingInfo );

      var dispatchingInfoGet = [];
      var dispatchingInfoPost = [];

      if( dispatchingInfo ){
    	  dispatchingInfoGet = dispatchingInfo[ "GET" ];
        dispatchingInfoPost = dispatchingInfo[ "POST" ];
      }

      for( var i=0; i<annotations.length; i++ ){

      	if( (annotations[i].method).toUpperCase() == "GET" ){
      		var j = 0;
      		for( j=0; j<dispatchingInfoGet.length; j++ ){
      			if( dispatchingInfoGet[j] && dispatchingInfoGet[j].id == annotations[i].id ){
              delete dispatchingInfoGet[j];
      				// break;
      			}
      		}

      		if( j == dispatchingInfoGet.length ){
      			var tempObject = {};
          		tempObject.id = annotations[i].id;
          		tempObject.path = annotations[i].path;
          		tempObject.controllerJS = annotations[i].controllerJS;
          		tempObject.controlFunction = annotations[i].controlFunction;
          		tempObject.viewPath = annotations[i].viewPath;
          		tempObject.view = annotations[i].view;

          		dispatchingInfoGet.push( tempObject );
      		}
      	} else if( (annotations[i].method).toUpperCase() == "POST" ){
      		var j = 0;
      		for( j=0; j<dispatchingInfoPost.length; j++ ){
      			if( dispatchingInfoPost[j] && dispatchingInfoPost[j].id == annotations[i].id ){
              delete dispatchingInfoPost[j];
              // break;
      			}
      		}

      		if( j == dispatchingInfoPost.length ){
      			var tempObject = {};
          		tempObject.id = annotations[i].id;
          		tempObject.path = annotations[i].path;
          		tempObject.controllerJS = annotations[i].controllerJS;
          		tempObject.controlFunction = annotations[i].controlFunction;
          		tempObject.viewPath = annotations[i].viewPath;
          		tempObject.view = annotations[i].view;

          		dispatchingInfoPost.push( tempObject );
      		}
      	}
      }

      var _dispatchingInfoGet = [];
      var _dispatchingInfoPost = [];

      var index = 0;
      for( var i=0; i<dispatchingInfoGet.length; i++ ){
        if( dispatchingInfoGet[i] ){
          _dispatchingInfoGet[index++] = dispatchingInfoGet[i];
        }
      }

      index = 0;
      for( var i=0; i<dispatchingInfoPost.length; i++ ){
        if( dispatchingInfoPost[i] ){
          _dispatchingInfoPost[index++] = dispatchingInfoPost[i];
        }
      }

      dispatchingInfo = { "GET" : _dispatchingInfoGet, "POST" : _dispatchingInfoPost };

      var dispatcher = fs.createWriteStream( __contextDispatchingInfo );
      dispatcher.write( JSON.stringify(dispatchingInfo, null, 4) );

      resolve( "SUCCESS" );

    } catch( err ){
      reject( err );
    }
  } );
}




function line( componentFileName, lineStr, annoType, index ){
  this.componentFileName = componentFileName;
  this.lineStr = lineStr;
  this.annoType = annoType;
  this.index = index;
}

function annotation(){
  this.method = "";
  this.id = "";
  this.path = "";
  this.controllerJS = "";
  this.controlFunction = "";
  this.viewPath = "";
  this.view = "";
}

exports.initStructure = function(){

	try {
		let common = require( __common );
		let initInfo = require( __initInfo );

		initContextArchitecture( common, initInfo );
		initTools( common, initInfo );
	} catch( err ){
		throw err;
	}
}






function initContextArchitecture( common, initInfo ){
	let architecture = initInfo[ "context_architecture" ];

	  if( getInitOption( initInfo, "auto_structure_creation" ) == "true" ){

	    for( var i=0; i<architecture.length; i++ ){
	      let folder = architecture[i].folder;

	      if( getInitOption( "remove_and_rebuild" ) == "true" ){
	          // makeBackup( folder );
	          console.log( "remove_and_rebuild" );
	      }
	      
	      if( architecture[i].files.length == 0 ){
	    	  common.buildStructure( folder );
	      }

	      for( var j=0; j<architecture[i].files.length; j++ ){
	        let fileName = architecture[i].files[j];

	        common.buildStructure( folder, fileName );
	      }
	    }
	  }
}

function initTools( common, initInfo ){
	let architecture = initInfo[ "tools" ];

	if( getInitOption( initInfo, "auto_structure_creation" ) == "true" ){

		for( var i=0; i<architecture.length; i++ ){

			if( architecture[i].enable ){
				let toolFiles = architecture[i].toolFiles;

				for( var j=0; j<toolFiles.length; j++ ){
					let folder = toolFiles[j].folder;
					let files = toolFiles[j].files;

					if( files.length == 0 ){
						common.buildStructure( folder );
					}

					for( var k=0; k<files.length; k++ ){
						let fileName = files[k];

						common.buildStructure( folder, fileName );
					}
				}
			}
		}
	}
}

function getInitOption( initInfo, option ){
  let options = initInfo[ "options" ];
  
  switch( option ) {
    case "use_service" :
      return String( options.use_service );
    case "remove_and_rebuild" :
      return String( options.remove_and_rebuild );
    case "auto_structure_creation" :
      return String( options.auto_structure_creation );
    default:
      return undefined;
  }
}
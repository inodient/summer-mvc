var fs = require( "fs" );
var path = require( "path" );
var common = require( path.join(process.cwd(), "node_modules", "summer-mvc", "tools", "common", "common.js") );
var mode = process.env.NODE_ENV;





exports.versionUpgrade = function(){
	try {
		translateQueryJsonToXml();
		upgradeProject();
	} catch( err ){
		throw err;
	}	
}

function translateQueryJsonToXml(){
	try {
		if( fs.existsSync( path.join(process.cwd(), "tools-submodules", "db", "queries", "query.json") ) ){
			__translateQueryJsonToXml( path.join(process.cwd(), "tools-submodules", "db", "queries"), "query.json");
		} else if( fs.existsSync( path.join(process.cwd(), "tools-submodules-dev", "db", "queries", "query.json") ) ){
			__translateQueryJsonToXml( path.join(process.cwd(), "tools-submodules-dev", "db", "queries"), "query.json");
		}	
	} catch( err ){
		throw err;
	}
}

function __translateQueryJsonToXml( folder, fileName ){
	try {
		var XMLWriter = require( 'xml-writer' );
		var beautify = require( 'beautify' );

		var queryJSON = require( path.join( folder, fileName) );
		var queryXML = "";

		xw = new XMLWriter;

		xw.startDocument();
		xw.startElement("queries");
		    
		for( var i=0; i<queryJSON.length; i++ ){
		    xw.startElement('query').writeAttribute('id', queryJSON[i].id).writeCData(queryJSON[i].queryString).endElement();
		}

		xw.endElement();
		xw.endDocument();

		queryXML = (xw.toString()).replace( /\'/gi, "~~");
		queryXML = beautify(queryXML, {format: 'xml'});
		queryXML = queryXML.replace( /~ ~/gi, "'" );
		queryXML = queryXML.replace( /~~/gi, "'" );
		// console.log( beautify(xw.toString(), {format: 'xml'}) );

		fs.openSync( path.join(folder, "query.xml"), 'w' );
		fs.writeFileSync( path.join(folder, "query.xml"), queryXML );

	} catch( err ){
		throw err;
	}
}

function upgradeProject(){
	try {
		var typeInfo = checkVersionUpgradeType();

		switch ( typeInfo.type ) {
			case "PRODUCTION_LEGACY":
				upgradeProudctionLegacy( "PRODUCTION_LEGACY" );
				break;

			case "DEVELOPMENT_LEGACY":
				upgradeDevelopmentLegacy( "DEVELOPMENT_LEGACY" );
				break;

			case "PRODUCTION_LEGACY_TO_DEVELOPMENT":
				upgraeProductionLegacyToDevelopment( "PRODUCTION_LEGACY_TO_DEVELOPMENT" );
				break;

			case "NO_NEEDS" || "EMPTY":
				break;
		}
	} catch( err ){
		throw( err );
	}
}

function checkVersionUpgradeType(){
	try {
		var initProdExist = fs.existsSync( path.join(process.cwd(), "core-properties", "initializer.json") );
		var initDevExist = fs.existsSync( path.join(process.cwd(), "core-properties-dev", "initializer.json") );

		var prodHttpsUsage = initProdExist === true ? require( path.join(process.cwd(), "core-properties", "initializer.json") ).options.use_https : false;
		var devHttpsUsage = initDevExist === true ? require( path.join(process.cwd(), "core-properties-dev", "initializer.json") ).options.use_https : false;

		var upgradeType = {};
		upgradeType.mode = mode;

		if( mode === undefined || mode === "production" ){
			if( initProdExist ){

				if( prodHttpsUsage ){
					upgradeType.type = "NO_NEEDS";
					// console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : NO NEEDS TO UPGRADE - PRODUCTION" );
				} else {
					upgradeType.type = "PRODUCTION_LEGACY";
					console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : TARGET FOR UPGRADING - PRODUCTION (FROM LEGACY PRODUCTION)" );
				}
			} else {
				upgradeType.type = "EMPTY";
				// console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : EMPTY PROJECT - AUTOMATIC BUILIDING MECHANISM" );
			}
		} else if( mode === "development" ){
			if( initDevExist ){
				if( devHttpsUsage ){
					upgradeType.type = "NO_NEEDS";
					// console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : NO NEEDS TO UPGRADE - DEVELOPMENT" );
				} else {
					upgradeType.type = "DEVELOPMENT_LEGACY";
					console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : TARGET FOR UPGRADING - DEVELOPMENT (FROM LEGACY DEVELOPMENT)" );
				}
			} else {

				if( initProdExist ){
					if( prodHttpsUsage ){
						upgradeType.type = "PRODUCTION_LEGACY_TO_DEVELOPMENT";
						console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : TARGET FOR UPGRADING - DEVELOPMENT (FROM LEGACY PRODUCTION)" );
					} else {
						upgradeType.type = "EMPTY";
						// console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : EMPTY PROJECT - AUTOMATIC BUILDING MECHANISM" );
					}
				} else {
					upgradeType.type = "EMPTY";
					// console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : EMPTY PROJECT - AUTOMATIC BUILDING MECHANISM" );
				}

			}
		}

		return upgradeType;
	} catch( err ){
		throw( err );
	}
}

function upgradeProudctionLegacy( type ){
	try {
		upgradeInitializer( type );
	} catch( err ){
		throw( err );
	}
}

function upgradeDevelopmentLegacy( type ){
	try {
		upgradeInitializer( type );
	} catch( err ){
		throw( err );
	}
}

function upgraeProductionLegacyToDevelopment( type ){
	try {
		exportInitializer();
		buildStructureFromLegacy();
	} catch( err ){
		throw( err );
	}
}

function upgradeInitializer( type ){
	try {
		var initInfoPath = "";
		var initInfo = null;
		var defaultInitInfo = null;

		if( type === "PRODUCTION_LEGACY" ){
			
			initInfoPath = path.join( process.cwd(), "core-properties", "initializer.json");
			initInfo = require( initInfoPath );
			defaultInitInfo = require( path.join( "../../core-properties/initializer.json") );
		
		} else if( type === "DEVELOPMENT_LEGACY" ){
			
			initInfoPath = path.join( process.cwd(), "core-properties-dev", "initializer.json");
			initInfo = require( initInfoPath );
			defaultInitInfo = require( path.join( "../../core-properties-dev/initializer.json") );

		}

		// Add Init Info Objects
		initInfo.options.use_https = defaultInitInfo.options.use_https;
		initInfo.protocol = defaultInitInfo.protocol;

		// Add https support folder Info
		for( var i=0; i<defaultInitInfo.context_architecture.length; i++ ){
			if( defaultInitInfo.context_architecture[i].folder.indexOf( "https") > -1 ){
				initInfo.context_architecture.push( defaultInitInfo.context_architecture[i] );
				break;
			}
		}

		// Delete mysql query json info
		for( var i=0; i<initInfo.tools.length; i++ ){
			if( initInfo.tools[i].name.indexOf( "mysqlHandler") > -1 ){

				for( var j=0; j<initInfo.tools[i].toolFiles.length; j++ ){
					if( initInfo.tools[i].toolFiles[j].folder.indexOf( "/db/queries") > -1 ){


						for( var k=0; k<initInfo.tools[i].toolFiles[j].files.length; k++ ){
							if( initInfo.tools[i].toolFiles[j].files[k].indexOf( "query.json" ) > -1 ){
								initInfo.tools[i].toolFiles.splice( j, 1 );
								break;
							}
						}

						break;
					}
				}

				break;
			}
		}

		// Add mysql xml query path info
		for( var i=0; i<defaultInitInfo.tools.length; i++ ){
			if( defaultInitInfo.tools[i].name.indexOf( "mysqlHandler") > -1 ){
				
				var mysqlHandlerInitInfo = defaultInitInfo.tools[i];
				var queryPath = {};
				for( var j=0; j<mysqlHandlerInitInfo.toolFiles.length; j++ ){
					if( mysqlHandlerInitInfo.toolFiles[j].folder.indexOf( "/db/queries") > -1 ){
						queryPath = mysqlHandlerInitInfo.toolFiles[j];
						break;
					}
				}

				for( var i=0; i<initInfo.tools.length; i++ ){
					if( initInfo.tools[i].name.indexOf( "mysqlHandler") > -1 ){

						initInfo.tools[i].toolFiles.push( queryPath );
						break;
					}
				}

				break;
			}
		}

		// Add static folders path
		if( initInfo.static_folders.length == 0 ){
			initInfo.static_folders = defaultInitInfo.static_folders;
		} else {
			for( var i=0; i<defaultInitInfo.static_folders.length; i++ ){

				for( var j=0; j<initInfo.static_folders.length; j++ ){
					if( JSON.stringify(defaultInitInfo.static_folders[i]) === JSON.stringify(initInfo.static_folders[j]) ) break;
					
					if( j === initInfo.static_folders.length - 1 ){
						initInfo.static_folders.push( defaultInitInfo.static_folders[i] );
						break;
					}
				}
			}
		}

		fs.truncateSync( initInfoPath );
		fs.writeFileSync( initInfoPath, JSON.stringify(initInfo, null, 4) );
	} catch( err ){
		throw( err );
	}
}

function exportInitializer(){
	try {
		var initInfoPath = "";
		var initInfo = null;
		var defaultInitInfo = null;




		initInfoPath = path.join( process.cwd(), "core-properties-dev", "initializer.json");
		defaultInitInfo = require( path.join( process.cwd(), "core-properties/initializer.json") );		

		var defaultInitInfoString = JSON.stringify( defaultInitInfo, null, 4 );

		defaultInitInfoString = defaultInitInfoString.replace( /core-properties/gi, "core-properties-dev" );
		defaultInitInfoString = defaultInitInfoString.replace( /tools-properties/gi, "tools-properties-dev" );
		defaultInitInfoString = defaultInitInfoString.replace( /tools-submodules/gi, "tools-submodules-dev" );
		defaultInitInfoString = defaultInitInfoString.replace( /query.json/gi, "query.xml" );

		// if( !fs.existsSync( path.join( process.cwd(), "tools-submodules/db/queries", "query.json" ) ) ){
		// 	if( defaultInitInfoString.indexOf( "query.xml" ) < 0 ){
		// 		defaultInitInfoString = defaultInitInfoString.replace( /query.json/gi, "query.xml" );
		// 	}
		// }

		defaultInitInfo = JSON.parse( defaultInitInfoString );

		common.makeHierarchy( "/core-properties-dev" );
		fs.openSync( initInfoPath, 'w' );
		fs.writeFileSync( initInfoPath, JSON.stringify(defaultInitInfo, null, 4) );
	} catch( err ){
		throw( err );
	}
}

function buildStructureFromLegacy(){
	try {
		var initInfoPath = path.join( process.cwd(), "core-properties-dev", "initializer.json");
		var initInfo = require( initInfoPath );

		__buildStructureFromLegacy( initInfo.context_architecture );
		
		for( var i=0; i<initInfo.tools.length; i++ ){
			__buildStructureFromLegacy( initInfo.tools[i].toolFiles );
		}
	} catch( err ){
		throw( err );
	}
}

function __buildStructureFromLegacy( filePathInfo ){
	try {
		for( var i=0; i<filePathInfo.length; i++ ){

			if( filePathInfo[i].folder.indexOf( "core-properties" ) > -1 
				|| filePathInfo[i].folder.indexOf( "tools-properties" ) > -1
				|| filePathInfo[i].folder.indexOf( "tools-submodules" ) > -1 ){

				var folder = filePathInfo[i].folder;
				common.makeHierarchy( folder );
				
				// if( folder.indexOf( "/db/queries") > -1 ){

				// 	fs.readdirSync( path.join( process.cwd(), folder.replace("-dev","") ) ).forEach(file => {
				// 	  	console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : copy file -", path.join( folder, file ) );
				// 		common.copyFile( path.join( process.cwd(), folder.replace( "-dev", ""), file), path.join( process.cwd(), folder, file) );
				// 	})
				// }

				var files = filePathInfo[i].files;

				if( files ){
					for( var j=0; j<files.length; j++ ){
						if( !fs.existsSync( path.join( process.cwd(), folder, files[j] ) ) 
						&& fs.existsSync( path.join( process.cwd(), folder.replace( "-dev", ""), files[j] ) ) )
						{
							console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "version control : copy file -", path.join( folder, files[j] ) );
							common.copyFile( path.join( process.cwd(), folder.replace( "-dev", ""), files[j]), path.join( process.cwd(), folder, files[j]) );
						}
					}			
				}
			}
		}
	} catch( err ){
		throw( err );
	}
}
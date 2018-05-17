module.exports.walkSync = walkSync;
module.exports.validation = validation;




function walkSync(dir, filelist) {

    try {
        var path = path || require('path');
        var fs = fs || require('fs'),
            files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(function(file) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = walkSync(path.join(dir, file), filelist);
            }
            else {
                var fileTermList = file.split(".");
                var extension = fileTermList[ fileTermList.length - 1 ];

                if( extension === "js" ){
                    filelist.push(path.join(dir, file));
                }
            }
        });

        return filelist;
    } catch( err ){
        console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[syntaxValidator.js]", err );
        throw err;
    }
};


function validation( fileList ){

    try {
        const vm = require("vm");

        for( var i=0; i<fileList.length; i++ ){
            try {
                var scriptString = ( require("fs").readFileSync( fileList[i] ) ).toString();
                require('vm').runInThisContext( scriptString );
            } catch( err ){

                if( err instanceof SyntaxError ){
                    var script = scriptString.split("\n");

                    var errMsg = err.stack;
                    var errMsgArray = errMsg.split( "\n" );

                    for( var j=0; j<errMsgArray.length; j++ ){
                        if( j === 0 ){
                            var errLine = errMsgArray[j].split(":")[1];
                        }

                        var line = errMsgArray[j].replace( /\/t/gi, " " )
                        console.log( "\x1b[31m%s\x1b[0m", "[Validation Failed]", line );
                        if( line.indexOf( "SyntaxError") > -1 ){
                            console.log( "\x1b[31m%s\x1b[0m", "[Validation Failed]", "  ", "at line", errLine, "(", fileList[i], ")");
                            break;
                        } 
                        
                    }
                    return false;
                }
            }
        }
        return true;
    } catch( err ){
        console.log( "\x1b[31m%s\x1b[0m", "[summer-mvc core]", "[syntaxValidator.js]", err );
        throw err;
    }


    
}

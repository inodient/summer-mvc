module.exports.walkSync = walkSync;
module.exports.validation = validation;




function walkSync(dir, filelist) {
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
};


function validation( fileList ){
    const vm = require("vm");

    for( var i=0; i<fileList.length; i++ ){
        try {
            var scriptString = ( require("fs").readFileSync( fileList[i] ) ).toString();

            // new vm.Script( scriptString );
            require('vm').runInThisContext( scriptString );
        } catch( err ){

            if( err instanceof SyntaxError ){
                var script = scriptString.split("\n");

                // console.log( "\x1b[31m%s\x1b[0m", "[Validation Failed]", "===== CODE START =====" );
                // console.log( "\n" );

                // for( var j=0; j<script.length; j++ ){
                //     var line = j + 1 + "    ";
                //     line += script[j].replace( /\/t/gi, " " )
                //     console.log( line );
                // }
                
                // console.log( "\x1b[31m%s\x1b[0m", "[Validation Failed]", "===== CODE END =====" );
                // console.log( "\n" );

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


                // console.log( errMsgArray );

                // console.log( "\x1b[31m%s\x1b[0m", "[Validation Failed]", err.stack );

                return false;
            }
            // return false;
        }
    }
    return true;
}


// function validation( fileList ){
//     var stackedy = require('stackedy');
//     var fs = require('fs');

//     for( var i=0; i<fileList.length; i++ ){
        
//         var src = fs.readFileSync(fileList[i]);
//         var fileName = (fileList[i]).split("/")[ (fileList[i]).split("/").length - 1 ];
//         var stack = stackedy(src, { filename : fileName }).run();

//         console.log( fileName );

//         stack.on('error', function (err, c) {
//             stack.stop();
//             console.log( c );
//             console.log('Error: ' + err);

//             var cur = c.current;
//             console.log('  -in ' + cur.filename + ' at line ' + cur.start.line);

//             c.stack.forEach(function (s) {
//                 console.log('  *in ' + s.filename + ', '
//                     + s.functionName + '() at line ' + s.start.line
//                 );
//             });
//         });
//     }
// }
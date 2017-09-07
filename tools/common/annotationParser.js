module.exports.parseController = parseController;

function parseController(){
	
}


/////////////////////////////////////////////////////////////////////
// read controller - start
//// fs.readFile( require("path").join( process.cwd(), "controller", "controller_basic.js" ), "utf8", function(err, data){
//// 	console.log( data );
//// } );
//
//// readline = require("readline");
//// var rd = readline.createInterface({
////     input: fs.createReadStream(require("path").join( process.cwd(), "controller", "controller_basic.js" )),
////     // output: process.stdout,
////     console: false
//// });
////
//// rd.on('line', function(line) {
//// 	con
////
//// 	if( line.indexOf( "*" ) == 0 ){
//// 		console.log(line);
//// 	}
////
//// });
//
//function readLines(input, func) {
//  var remaining = '';
//
//  input.on('data', function(data) {
//    remaining += data;
//    var index = remaining.indexOf('\n');
//    while (index > -1) {
//      var line = remaining.substring(0, index);
//      remaining = remaining.substring(index + 1);
//      func(line);
//      index = remaining.indexOf('\n');
//    }
//  });
//
//  input.on('end', function() {
//    if (remaining.length > 0) {
//      func(remaining);
//    }
//  });
//}
//
//function func(data) {
//  console.log('Line: ' + data);
//}
//
//var input = fs.createReadStream(require("path").join( process.cwd(), "controller", "controller_basic.js" ));
//readLines(input, func);
//
//// read controller - end
/////////////////////////////////////////////////////////////////////

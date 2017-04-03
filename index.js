const was = require( "./app.js" );

var os = "windows";

if( os === "windows" ){
  was.setDispatcher( __dirname + "\\dispatcher", "dispatcher.json" );
  was.setDefaultViewPath( __dirname + "\\views" );
} else{
  was.setDispatcher( __dirname + "/dispatcher", "dispatcher.json" );
  was.setDefaultViewPath( __dirname + "/views" );
}

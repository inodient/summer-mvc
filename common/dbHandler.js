exports.dbHandler = function(){
  const mysql = require( "mysql" );

  const connectionInfo = require( require("path").join(process.cwd(), "properties", "db.json") );
  const queries = require( require("path").join(process.cwd(), "queries", "query.json") );





  const pool = mysql.createPool( connectionInfo );

  this.executeQuery = function(){

    let queryValues = [];
    let callback = arguments[ arguments.length - 1 ];

    for( var i=1; i<arguments.length-1; i++ ){
      queryValues.push( arguments[i] );
    }

    let queryString = this.getQueryString( arguments[0], queryValues );

    pool.query( queryString, function (error, results, fields) {
      if (error) throw error;
      callback( error, results, fields );
    });
  }

  this.getQueryString = function( queryId ){

    let queryString = "";

    for( var i=0; i<queries.length; i++ ){
      if( queries[i].id === queryId ){

        if( arguments.length > 1 ){
          queryString = mysql.format( queries[i].queryString, arguments[1] );
        } else{
          queryString = queries[i].queryString;
        }

        break;
      }
    }

    return queryString;
  }
}

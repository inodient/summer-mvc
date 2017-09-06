// exports.control = function( req, res ){
//   return new Promise( function(resolve, reject){
//     var model = {};
//
//     try{
//       model.ajaxResult = "Called with [" + req.query111[ "text" ] + "]";
//       resolve( model );
//     } catch( err ){
//       reject( err );
//     }
//   } );
// }



exports.control = function( req, res ){
  var model = {};

  // try{
    model.ajaxResult = "Called with [" + req.query[ "text" ] + "]";

    return model;
  // } catch( err ){
  //   throw( err );
  // }
}

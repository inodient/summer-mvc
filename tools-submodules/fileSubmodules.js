module.exports.getSavedFileName = getSavedFileName;

function getSavedFileName(){
  var materials = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var savedFileName = "";

  for( let i=0; i<64; i++ ){
    savedFileName += materials.charAt( Math.floor(Math.random() * 64) % materials.length );
  }

  return savedFileName;
}

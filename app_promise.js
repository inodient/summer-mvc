// 1. Using Javascript callback
function A( a, b, callback ){
  callback( a + b );
}

function B( c, d, callback ){
  callback( c + d );
}

function C( e, f, callback ){
  callback( e + f );
}

// Begin at first function and function that I want to execute must located in last
// A( 1, 2, function(res){
//   B( 3, res, function(res2){
//     C( 4, res2, function(res3){
//       console.log( res3 );
//     } )
//   } )
// } );

// 2. Using Promise
function _A( a, b ){
  return new Promise( function(resolve, reject){
    resolve( a + b );
  } );
}

function _B( c, d ){
  return new Promise( function(resolve, reject){
    resolve( c + d );
  } );
}

function _C( e, f ){
  return new Promise( function(resolve, reject){
    resolve( e + f );
  } );
}

// _A( 1, 2 )
// .then( _B.bind( null, 3 ) )
// .then( _C.bind( null, 4 ) )
// .then( function(res){
//   console.log( res );
// } );

// 3. Asynchronous
function async_A(){
  console.log( "A" );
}

function async_B( callback ){
  setTimeout( function(){
    console.log( "B" );
    callback();
  }, 2000 );
}

function async_C(){
  console.log( "C" );
}

function async(){
  async_A();
  async_B();
  async_C();
}

// async();

// 4. Synchronous ( Async function call in promise with resolver )
function sync_A(){
  return new Promise( function(resolve, reject){
    async_A();
    resolve();
  } );
}

function sync_B(){
  // return new Promise( function(resolve, reject){
  //   async_B( function(){ console.log( "sync_B" ) } );
  //   resolve();
  // } );

  return new Promise( function(resolve, reject){
    async_B( function(){
      resolve( "sync_B" );
    } );
  } );
}

function sync_C(){
  return new Promise( function(resolve, reject){
    async_C();
    resolve();
  } );
}

function sync(){
  sync_A()
  .then( sync_B )
  .then( sync_C );
}

sync();

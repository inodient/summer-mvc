module.exports = modelAndView;

function modelAndView( model, view ){
  this.model = {};
  this.view = {};
  this.setModel = function( m ){
    this.model = m;
  }
  this.setView = function( v ){
    this.view = v;
  }
}

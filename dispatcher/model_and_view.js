exports.ModelAndView = function( model, view ){
  this.model = model;
  this.view = view;
  this.setModel = function( m ){
    this.model = m;
  }
  this.setView = function( v ){
    this.view = v;
  }
}

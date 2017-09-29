exports.control = function( req, res ){

	var model = {};
	
	logger.debug( req.query["text"] );
	
	model.text = "Called with Text [" + req.query["text"] + "]";

	return model;
}

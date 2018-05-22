exports.control = function( req, res ){

	var model = {};

	logger.debug( req.query["text"] );

	model.text = "Called Ajax Request with Text [" + req.query["text"] + "]";

	return model;
}

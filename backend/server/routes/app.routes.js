var path = require('path');
module.exports = function(app) {
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile(path.resolve('./static/index.html'));
	});

};
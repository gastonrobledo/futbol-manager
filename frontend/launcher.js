var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 9000;

// url encoding
app.use(bodyParser.urlencoded({
    extended: false
}));
// gzip
// redirect all html requests to `index.html`
app.use(function(req, res, next) {
    if (path.extname(req.path).length > 0) {
        // normal static file request
        next();
    } else {
        // should force return `index.html` for angular.js
        req.url = '/index.html';
        next();
    }
});
// static file serve
app.use(express.static(path.join(__dirname, 'static/')));

app.listen(PORT, function() {
    console.log('Express server listening on port' + PORT);
});
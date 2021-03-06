// modules =================================================
var express        = require('express');

var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cors           = require('cors');
var path           = require('path');
var helmet         = require('helmet');
var config         = require('./config');
var http           = require('http');
var createDomain   = require('domain').create;

module.exports = function() {

    var app = express();

    app.set('superSecret', config.secretKey); // secret variable


    app.use(cors());

    // get all data/stuff of the body (POST) parameters
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
    app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    app.use(function(req, res, next) {
        // Prepare Domain for error handling
        var domain = createDomain();
        domain.add(req);
        domain.add(res);
        domain.on('error', function(err) {
            next(err);
        });

        // Passing the request url to environment locals
        res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;

        return next();
    });


    var server = http.Server(app);

    // Globbing model files
    config.getGlobbedFiles('./server/models/**/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });

    // Globbing routing files
    config.getGlobbedFiles('./server/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });



    return server;
};
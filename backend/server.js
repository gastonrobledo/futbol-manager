'use strict';
/**
 * Module dependencies.
 */
var init = require('./server/config/init')(),
    config = require('./server/config/config'),
    mongoose = require('mongoose'),
    cluster = require('cluster'),
    _ = require('lodash');

// configuration ===========================================

// Bootstrap db connection
var db = mongoose.connect(config.db);


// Start server.
var numCPUs = Math.ceil(require('os').cpus().length / 2);
if (cluster.isMaster) {
    var workers = [];

    // Helper function for spawning worker at index 'i'.
    var spawn = function (i) {
        workers[i] = cluster.fork();
        console.log('worker ' + workers[i].process.pid + ' created');

        // Optional: Restart worker on disconnect
        workers[i].on('disconnect', function (worker, code, signal) {
            console.log('respawning worker', i);
            spawn(i);
        });

    };

    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });

    // Spawn workers.
    for (var i = 0; i < numCPUs; i++) {
        spawn(i);
    }
} else {

    // Init the express application
    var server = require('./server/config/express')();

    server.listen(config.port, function () {
        console.log('server started on ' + config.port + ' port');
    });
}

'use strict';

var path = require('path');

var port = require('./all').port;

module.exports = {
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/futbol-manager',
};
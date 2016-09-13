'use strict';

var path = require('path');

module.exports = {
    db: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/futbol-manager',
};
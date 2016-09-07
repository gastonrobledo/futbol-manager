var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();



module.exports = function (app) {

    var controller = require('../api/teams.controller');
    // Teams Methods
    app.get('/api/teams', controller.getTeams);

};
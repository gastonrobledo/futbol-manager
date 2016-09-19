var express = require('express');
var jwt = require('jsonwebtoken');

var matches = require('../api/matches.controller');
var players = require('../api/players.controller');
var auth = require('../api/auth.controller');

module.exports = function (app) {

    //Auth method
    app.post('/api/auth', auth.auth);
    // route middleware to verify a token
    var tokenMiddleWare = express.Router();
    tokenMiddleWare.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.user = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });
    //Register method
    app.post('/api/players', players.createPlayer);

    app.use('/api', tokenMiddleWare);

    //Authorized method below

    // Matches methods
    app.post('/api/matches', matches.createMatch);
    app.put('/api/matches/:id', matches.updateMatch);
    app.delete('/api/matches/:id', matches.deleteMatch);
    app.get('/api/matches', matches.getMyMatches);
    // Players methods
    app.get('/api/players/:id', players.getPlayer);
    app.put('/api/players/:id', players.updatePlayer);

};
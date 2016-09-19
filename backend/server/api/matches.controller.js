var mongoose = require('mongoose');
var Match = mongoose.model('Match');
var Player = mongoose.model('Player');
var Game = mongoose.model('Game');
var _ = require('lodash');
var moment = require('moment');

// POST: Create Match
exports.createMatch = function (req, res) {
    var data = req.body;
    var match = new Match();
    match.name = data.name;
    match.playersPerTeam = data.playersPerTeam;
    match.day = data.day;
    match.location = data.location;
    match.players = data.players || [];
    match.time = data.time;
    match.teamA = data.teamA;
    match.teamB = data.teamB;

    var admins = data.admins || [];
    //Assign myself as admin
    var mySelfAsAdmin = _.find(admins, function (id) {
        return id === req.user._id;
    });
    if (!mySelfAsAdmin) {
        admins.push(req.user._id);
    }
    match.admins = admins;
    match.save(function (err, match) {
        if (!err) {
            // create next game associated to it
            var game = new Game();
            game.match = match;
            game.when = moment.utc().day(match.day).startOf('day').format('YYYY-MM-DD');
            game.save(function (err, game) {
                if (err) return res.status(500).send({message: err.message});
                var matchObj = match.toObject();
                matchObj.next_game = game;
                res.status(201).jsonp(matchObj);
            });

        } else {
            res.status(500).send({message: err.message});
        }
    });
};
// PUT: Update Match
exports.updateMatch = function (req, res) {
    Match.findOne({'_id': req.params.id}, function (err, match) {
        if (!match) {
            return res.status(404).send({message: "Match not found"});
        }
        var data = req.body;
        match.name = data.name;
        match.numberOfPlayers = data.numberOfPlayers;
        match.daysOfWeek = data.daysOfWeek;
        if (data.lat && data.lng) {
            match.locationMatch = {
                lat: data.lat,
                lng: data.lng
            };
        }
        match.players = data.players || [];
        match.time = data.time;
        var admins = data.admins || [];

        var mySelfAsAdmin = _.find(admins, function (id) {
            return id === req.user._id;
        });
        if (!mySelfAsAdmin) {
            admins.push(req.user._id);
        }

        match.admins = admins;
        match.save(function (err, match) {
            if (!err) {
                res.status(200).send(match);
            } else {
                res.status(500).send({message: err.message});
            }
        });
    });

};
// DELETE: Delete Match
exports.deleteMatch = function (req, res) {
    Match.findOne({
        "$and": [
            {"_id": req.params.id}
        ]
    }).exec(function (err, match) {
        if (err) return res.status(500).send({message: err.message});
        if (match) {
            if (_.includes(match.admins, req.user._id)) {
                match.remove(function (err) {
                    if (!err) return res.status(200);
                    return res.status(500).send({message: err.message});
                });
            } else {
                return res.status(403).send({message: "You don't have permission to delete this match."});
            }
        } else {
            return res.status(404).send({message: "match not found"});
        }
    });
};
// GET: Get Matches
exports.getMyMatches = function (req, res) {

    Match.find({
            "$or": [
                {"admins": {"$in": [req.user._id]}},
                {"players": {"$in": [req.user._id]}}
            ]
        })
        .lean()
        .populate('players', 'firstName lastName email')
        .exec(function (err, matches) {
            if (!err) {
                res.status(200).jsonp(matches);
            } else {
                res.status(500).send({message: err.message});
            }
        });
};
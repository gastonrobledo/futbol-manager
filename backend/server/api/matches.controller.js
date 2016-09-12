var mongoose = require('mongoose');
var Matches = mongoose.model('Matches');
var Players = mongoose.model('Players');
var Teams = mongoose.model('Teams');
var _ = require('lodash');

exports.createMatch = function (req, res) {
    var match = new Matches();
    match.teams = [];
    match.numberOfPlayers = req.body.numberOfPlayers;
    if (req.body.lat && req.body.lng) {
        match.locationMatch = {
            lat: req.body.lat,
            lng: req.body.lng
        };
    }
    match.time = req.body.timeToPlay;
    match.admins = [
        req.user._id
    ];
    match.save(function (err, match) {
        if (!err) {
            res.status(201).send(match);
        } else {
            res.status(500).send({message: err.message});
        }
    });
};

exports.getMyMatches = function (req, res) {

    Teams.find({"players": {"$in": [req.user]}}).exec(function (err, teams) {
        var teams_ids = _.map(teams, '_id');
        Matches
            .find({
                "$or": [
                    {"admins": {"$in": [req.user._id]}},
                    {"teams": {"$in": [teams_ids]}}
                ]
            })
            .lean()
            .populate('teams', 'name players')
            .exec(function (err, matches) {
                Players.populate(matches, {
                    path: 'teams.players',
                    select: 'firstName lastName email'
                }, function (err, populatedMatches) {
                    if (!err) {
                        res.status(200).jsonp(populatedMatches);
                    } else {
                        res.status(500).send({message: err.message});
                    }
                });
            });
    });
};
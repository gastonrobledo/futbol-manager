var mongoose = require('mongoose');
var Matches = mongoose.model('Matches');
var Players = mongoose.model('Players');
var Teams = mongoose.model('Teams');
var _ = require('lodash');

exports.createMatch = function (req, res) {
    var data = req.body;
    var match = new Matches();
    match.name = data.name;
    match.numberOfPlayers = data.numberOfPlayers;
    match.daysOfWeek = data.daysOfWeek || [];
    if (data.lat && data.lng) {
        match.locationMatch = {
            lat: data.lat,
            lng: data.lng
        };
    }
    match.players = data.players || [];
    match.time = data.time;

    var admins = data.admins || [];

    var mySelfAsAdmin = _.find(admins, function(id){
        return id === req.user._id;
    });
    if(!mySelfAsAdmin){
        admins.push(req.user._id);
    }

    match.admins = admins;
    match.save(function (err, match) {
        if (!err) {
            res.status(201).send(match);
        } else {
            res.status(500).send({message: err.message});
        }
    });
};

exports.updateMatch = function (req, res) {
    Matches.findOne({'_id': req.params.id}, function(err, match){
        if(!match){
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

        var mySelfAsAdmin = _.find(admins, function(id){
            return id === req.user._id;
        });
        if(!mySelfAsAdmin){
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

exports.getMyMatches = function (req, res) {

    Matches
        .find({
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
var mongoose = require('mongoose');
var Player = mongoose.model('Player');
var _ = require('lodash');

//POST Create Player
exports.createPlayer = function (req, res) {
    var player = new Player();
    player.email = req.body.email;
    player.firstName = req.body.firstName;
    player.lastName = req.body.lastName;
    player.password = req.body.password;
    player.save(function (err, p) {
        if (!err) {
            var sanitized = _.omit(p.toObject(), 'password');
            res.status(201).jsonp(sanitized);
        } else {
            res.status(400).send({message: err.message});
        }
    });
};
// PUT update player
exports.updatePlayer = function (req, res) {
    Player.findOne({"_id": res.params.id}).exec(function (err, player) {
        if (err) return res.status(500).send({message: err.message});
        if (player) {
            player.email = req.body.email;
            player.firstName = req.body.firstName;
            player.lastName = req.body.lastName;
            player.password = req.body.password;
            player.save(function (err, p) {
                if (!err) {
                    var sanitized = _.omit(p.toObject(), 'password');
                    return res.status(201).jsonp(sanitized);
                } else {
                    return res.status(400).send({message: err.message});
                }
            });
        } else {
            return res.status(404);
        }
    });
};
// GET get player
exports.getPlayer = function (req, res) {
    Player.findOne({"_id": res.params.id}).exec(function (err, player) {
        if (err) return res.status(500).send({message: err.message});
        if (player) {
            var sanitized = _.omit(p.toObject(), 'password');
            return res.status(200).jsonp(sanitized);
        } else {
            return res.status(404);
        }
    });
};
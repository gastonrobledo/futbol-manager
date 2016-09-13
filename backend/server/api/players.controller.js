var mongoose = require('mongoose');
var Players = mongoose.model('Players');
var _ = require('lodash');


exports.register = function (req, res) {
    var player = new Players();
    player.email = req.body.email;
    player.firstName = req.body.firstName;
    player.lastName = req.body.lastName;
    player.password = req.body.password;
    player.save(function(err, p){
        if(!err){
            var sanitized = _.omit(p.toObject(), 'password');
            res.status(201).jsonp(sanitized);
        }else{
            res.status(400).send({message: err.message});
        }
    });
};
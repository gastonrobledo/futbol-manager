var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config  = require('../config/config');
var Player = mongoose.model('Player');

exports.auth = function(req,res){

    Player.findOne({"email": req.body.email}).then(function(player){
        if(player) {
            player.verifyPassword(req.body.password, function(err, valid){
                if (valid) {
                    //search for user then create token
                    var sanitized = {'_id': player._id, 'email': player.email};
                    jwt.sign(sanitized, config.secretKey, {
                        expiresIn: '24h' // expires in 24 hours
                    }, function(err, token){
                        res.json({
                            success: true,
                            token: token
                        });
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Email / Password invalid"
                    });
                }
            });
        }else{
            res.status(400).json({
                success: false,
                message: "Email / Password invalid"
            });
        }
    }, function(){
        res.status(400).json({
            success: false,
            message: "Email / Password invalid"
        });
    });

};

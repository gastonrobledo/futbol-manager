var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config  = require('../config/config');
var Players = mongoose.model('Players');

exports.auth = function(req,res){

    Players.findOne({"email": req.body.email}).then(function(player){
        if(player) {
            player.verifyPassword(req.body.password, function(err, valid){
                if (valid) {
                    //search for user then create token
                    jwt.sign(player, config.secretKey, {
                        expiresIn: '24h' // expires in 24 hours
                    }, function(err, token){
                        console.log(err, token);
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

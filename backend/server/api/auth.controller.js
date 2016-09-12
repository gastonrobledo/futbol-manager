var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config  = require('../config/config');
var Players = mongoose.model('Players');

exports.auth = function(req,res){

    Players.findOne({"email": req.body.email}).lean().then(function(player){
        if(player.password === req.body.password) {
            //search for user then create token
            var token = jwt.sign(player, config.secretKey, {
                expiresIn: '24h' // expires in 24 hours
            });

            res.json({
                success: true,
                token: token
            });
        }else{
            res.send(400).json({
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

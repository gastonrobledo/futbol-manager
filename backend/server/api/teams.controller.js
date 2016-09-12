var mongoose = require('mongoose');
var Teams = mongoose.model('Teams');


exports.getTeams = function (req, res) {
    Teams.find({'players': {'$in': [req.user._id]}}).then(function(teams){
        res.status(200).json(teams);
    }, function(){
        res.status(200).json([]);
    });
};
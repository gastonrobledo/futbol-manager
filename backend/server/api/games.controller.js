var mongoose = require('mongoose');
var Games = mongoose.model('Games');


exports.getGames = function (req, res) {
    Games.find({'players': {'$in': [req.user._id]}}).then(function(teams){
        res.status(200).json(teams);
    }, function(){
        res.status(200).json([]);
    });
};
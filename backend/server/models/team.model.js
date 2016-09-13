var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

/**
 * Team Schema
 */
var Team = new Schema({
    name: {
        type: String,
        required: true
    },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matches'
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players'
    }],
    updated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});

Team.index({name: 1});

mongoose.model('Teams', Team);
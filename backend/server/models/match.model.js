var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

/**
 * Matches Schema
 */
var Match = new Schema({
    name: {
        type: String,
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players'
    }],
    playersPerTeam: {
        type: Number,
        default: 7
    },
    teamA: {
        type: String,
        required: true
    },
    teamB: {
        type: String,
        required: true
    },
    location: {},
    day: {
        type: Number
    },
    time: {
        type: String,
        required: true
    },
    admins: [{
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

Match.index({name: 1});

mongoose.model('Match', Match);
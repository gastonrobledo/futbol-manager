var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

/**
 * Matches Schema
 */
var Match = new Schema({
    Name: {
        type: String,
        required: true
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams'
    }],
    numberOfPlayers: {
        type: Number,
        default: 7
    },
    locationMatch: {},
    daysOfWeek: [{
        type: Number
    }],
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

mongoose.model('Matches', Match);
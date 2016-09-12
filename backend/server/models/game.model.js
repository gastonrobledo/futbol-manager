var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

/**
 * Games Schema
 */
var Game = new Schema({
    teams: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
        required: true
    },
    assistants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players'
    }],
    score: {},
    when:{
        type: Date
    },
    updated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});

Game.index({name: 1});

mongoose.model('Games', Game);

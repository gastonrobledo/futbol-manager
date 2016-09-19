var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongooseHidden = require('mongoose-hidden')({ defaultHidden: { password: true } });


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    return (this.provider !== 'local' || (password && password.length >= 6));
};
/**
 * Player Schema
 */
var Player = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        default: '',
        bcrypt: true,
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
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

Player.set('toJSON', { hide: 'password' });

Player.index({  email: 1 });

Player.plugin(require('mongoose-bcrypt'));
Player.plugin(mongooseHidden);

mongoose.model('Player', Player);

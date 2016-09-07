var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var PDFFields = new Schema({
    name: {
        type: String,
        required: true
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PDFTemplate',
        required: true
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

PDFFields.index({  name: 1 });

mongoose.model('PDFFields', PDFFields);
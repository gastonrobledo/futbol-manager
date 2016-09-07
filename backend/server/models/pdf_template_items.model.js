var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var PDFTemplateItem = new Schema({
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PDFTemplate',
        required: true
    },
    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PDFFields',
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
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

PDFTemplateItem.index({  template: 1, field: 1 });

mongoose.model('PDFTemplateItem', PDFTemplateItem);
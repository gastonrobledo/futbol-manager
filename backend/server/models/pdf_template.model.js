var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var PDFTemplate = new Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	width:{
		type: Number,
		required: true
	},
	height:{
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

PDFTemplate.index({  name: 1 });
mongoose.model('PDFTemplate', PDFTemplate);
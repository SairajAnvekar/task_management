var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	id: { type: String},
    name: { type: String },
	priority:{type: Number},    
});

module.exports = mongoose.model('Task1',TaskSchema);
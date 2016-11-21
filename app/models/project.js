var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    name: { type: String },
	desc:{type: String}
});

module.exports = mongoose.model('project',ProjectSchema);
var mongoose = require('mongoose');

var membersSchema =new mongoose.Schema({
	name : String,
    userid   : String,
    userdp : String
});
var ProjectSchema = new mongoose.Schema({
    name: { type: String },
	desc:{type: String},
	createdBy:{type: String},
	members:[membersSchema],
	
});

module.exports = mongoose.model('project',ProjectSchema);
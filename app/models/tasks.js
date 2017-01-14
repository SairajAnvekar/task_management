var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	id: { type: String},
    name: { type: String },
	priority:{type: Number},  
    description:{ type: String },
    status:{ type: String },
	type:{type:String},
	start:{type:String},
	end:{type:String}		
});

module.exports = mongoose.model('Task1',TaskSchema);
var mongoose = require('mongoose');

var SprintSchema = new mongoose.Schema({
    name: { type: String , trim: true},
	projectId:{ type: String },
	status:{type: String},
	tasks:[{type: String}],
	working:[{type: String}],
	stage:[{type: String}],
	prod:[{type: String}],
	deployment:[{
	   name:{type:String},
	   tasks:[{
	     taskId:{type:String}
	   }]
	
	}]
	
});

module.exports = mongoose.model('sprint',SprintSchema);
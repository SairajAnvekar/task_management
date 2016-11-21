var mongoose = require('mongoose');

var SprintSchema = new mongoose.Schema({
    name: { type: String , trim: true},
	projectId:{ type: String },
	status:{type: String}
	tasks:[
		name:{type:String ,   trim: true},
		priority:{type:Number},
		desc:{type:String},
		status:{type:String},
	],
	deployment:[
	   name:{type:string},
	   tasks:[
	     taskId:{type:String}
	   ]
	
	]
	
});

module.exports = mongoose.model('sprint',SprintSchema);
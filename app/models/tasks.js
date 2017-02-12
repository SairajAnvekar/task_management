var mongoose = require('mongoose');

var commentsSchema =new mongoose.Schema({
	comment  : String,
    userid   : String,
    userdp   : String,
	userName : String,
});
var TaskSchema = new mongoose.Schema({
	id: { type: String},
    name: { type: String },
	priority:{type: Number},  
    description:{ type: String },
    status:{ type: String , enum: ['not started', 'started','completed'] ,default : 'not started'},
	type:{type:String},
	start:{type:Date},
	end:{type:Date},
	created_by:{type:String},
	created_date:{type: Date,default: Date.now},
	progress:{type: Number,default : 0}, 
	asign_to_id:{type:String},
	asign_to_name:{type:String},
	comments:[commentsSchema],
 	
});

module.exports = mongoose.model('Task1',TaskSchema);
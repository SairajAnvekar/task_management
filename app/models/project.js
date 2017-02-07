var mongoose = require('mongoose'),Schema = mongoose.Schema;

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
	startDate:{type:Date},
	endDate:{type:Date},
	completed:{type:Number,default:0},
    sprintCount:[{type: Schema.Types.ObjectId, ref: 'sprint'}]
});

module.exports = mongoose.model('project',ProjectSchema);
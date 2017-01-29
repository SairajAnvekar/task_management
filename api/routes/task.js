var express = require('express');
var router = express.Router();
var Task = require('../../app/models/tasks.js');
var Sprint = require('../../app/models/sprint.js');


router.get('/',function(req,res,next) {   
    res.json('home');
});


router.get('/sprint/:id',function(req,res,next) {   
      Sprint.find({_id: req.params.id},function(err, doc){	 
	   res.json({"data":doc});
       console.log("eeeeeeeeeeeeeeeeeeeeee"+doc);	   
	});
});


 router.get('/sprint5',function(req,res,next) { 
           console.log("eeeeeeeeeeeeeeeeeeeeee")	   
	});


 router.post('/addTask',function(req, res, next){
	   TaskObj = {          
		   priority:1,
		   name:req.body.name,
		   status:req.body.status,
        };
		
	var sprintId=req.body.sId
	
	Sprint.update({_id:sprintId}, {$push: {tasks: TaskObj}}, {upsert:true}, function(err){
		if(err){
				console.log(err);
		}else{
				console.log("Successfully added");
		}
	});
	
	Sprint.find({_id:sprintId},function(err, sprint){
       	   res.json({"data":sprint});	
	});
 
});




router.post('/addComments',function(req,res){
	var taskId=req.body._id;
    var comment=req.body.comment;
	var user=req.user;
	  var comments={
		  comment:comment,
		  userid:user._id,
		  userdp:'ffdgg',
	  };
	  
	 	Task.findOneAndUpdate({_id:taskId}, {$push: {comments: comments}}, {upsert:true}, function(err,task){
			res.json({"data":task});			
		});
	 
	 
});

router.post('/updateTask',function(req,res){
	var taskId=req.body._id;
	var reqTask=req.body.task;
	
	Task.findById(reqTask._id, function (err, task) {
		if (err) return handleError(err);
         
		task.status=reqTask.status;
		task.progress=reqTask.progress;
		task.save(function (err, updatedTask) {
		if (err) return handleError(err);
		res.json({"data":updatedTask});
		});
	});
	console.log(reqTask);

	
}
);

module.exports = router;
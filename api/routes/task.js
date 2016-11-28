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
	});
});
 
 router.post('/addTask',function(req, res, next){
	   TaskObj = {          
		   priority:1,
		   name:req.body.name,
		   status:req.body.status,
        };
		
	var sprintId=req.body.sId
	Sprint.find({_id:sprintId},function(err, sprint){
       	   res.json({"data":sprint});	
	});
 
});


module.exports = router;
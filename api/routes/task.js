var express = require('express');
var router = express.Router();
var Task = require('../../app/models/tasks.js');
var Sprint = require('./app/models/sprint.js');


router.get('/',function(req,res,next) {   
    res.json('home');
});

router.get('/tasks',function(req, res, next){
 Task.find({},function(err, user) {	 
	   res.json({"data":user});		  
 });

});


module.exports = router;
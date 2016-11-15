var mongoose = require('mongoose');
var express = require('express');
var Task = require('./app/models/tasks.js');
var configDB = require('./config/database.js');
var bodyParser     =        require("body-parser");
mongoose.connect(configDB.url); // connect to our database



    app = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/views', express.static(__dirname + '/views/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handler for internal server errors

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.get('/test', function(req, res, next) {  
    res.render('index');
});

app.get('/testDb', function(req, res, next) {  
    Task.find({},function(err, user) {
			   var data=user;
			   res.json(data);
        });

});

app.get('/tasks',function(req, res, next){
 Task.find({},function(err, user) {	 
	   res.json({"data":user});		  
 });

});

app.get('/task/:id',function(req,res)
{
 Task.find({_id: req.params.id},function(err, user) {	 
	   res.json({"data":user});		  
	});

	
	
});

app.delete('/task/:id',function(req,res){
	 Task.remove({_id: req.params.id},function(err, user) {	 
	   res.json({"data":user});		  
	});
});



app.post('/addTask',function(req, res){
	console.log(req.body);
	   TaskObj = {
           id:req.body._id,
		   priority:1,
		   name:req.body.name,
		 
        };
	var task= new Task(TaskObj)
	task.save(function (err, doc) {
        if (err || !doc) {
            throw 'Error';
        } else {
            res.json({"data":doc});
        }
    });
});






app.use(errorHandler);

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});

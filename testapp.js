var mongoose = require('mongoose');
var express = require('express');
var Task = require('./app/models/tasks.js');
var Project = require('./app/models/project.js');
var Sprint = require('./app/models/sprint.js');
var configDB = require('./config/database.js');
var bodyParser     =        require("body-parser");
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
mongoose.connect('mongodb://localhost/projectManagement'); // connect to our database
var session = require('express-session');
require('./config/passport')(passport); // pass passport for configuration

app = express(),
engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.engine('ejs', engines.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/views', express.static(__dirname + '/views/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
// Handler for internal server errors
var routes = require('./routes/home');
var taskApi = require('./api/routes/task');


app.use(session({
    secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.get('/test', function(req, res, next) {  
    res.render('index');
});

app.get('/home', function(req, res, next) {  
    res.render('home');
});

app.get('/home2', function(req, res, next) {  
    res.render('home.ejs');
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


app.get('/tasks/sprint/:id',function(req,res)
{
 Task.find({id: req.params.id},function(err, task) {	 
	   res.json({"data":task});		  
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
       console.log(req.params.id);
	   
	   Sprint.update({tasks:req.params.id},{ $pullAll: {tasks: [req.params.id] }},function(err, user) {
		   
		    res.json({"data":user});	
	   });	  	  
	});
});



app.post('/addTask',function(req, res){
	console.log(req.body);
	var sprintId=req.body._id;
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
		 
		 sprintTask={
			 taskId:doc._id,
		 };
		Sprint.update({_id:sprintId}, {$push: {tasks:doc._id}}, function(err){
		if(err){
				console.log(err);
		}else{
				console.log("Successfully added");
		}
		
	});
		
		
    });
});


app.post('/project',function(req,res){
	console.log(req.body);
	var projectData={
		name:req.body.name,
		desc:req.body.desc,
	};
	var project=new Project(projectData);
	project.save(function(err,doc){
		 if (err || !doc) {
            throw 'Error';
        } else {
            res.json({"data":doc});
        }		
	});	
});

app.get('/project',function(req, res, next){	
	Project.find({},function(err, doc) {	 
	   res.json({"data":doc});		  
	});
});

app.get('/project/:id',function(req,res)
{
 Project.find({_id: req.params.id},function(err, doc){	 
	   res.json({"data":doc});		  
	});
	
});



app.post('/sprint',function(req,res){
	console.log(req.body);
	var sprintData={
		name:req.body.name,
		status:req.body.status,
		projectId:req.body.projectId
	};
	var sprint=new Sprint(sprintData);
	sprint.save(function(err,doc){
		 if (err || !doc) {
            throw 'Error';
        } else {
            res.json({"data":doc});
        }		
	});	
});

app.get('/sprint/:projectId',function(req,res)
{
 Sprint.find({projectId: req.params.projectId},function(err, doc){	 
	   res.json({"data":doc});		  
	});
	
});

app.get('/sprint',function(req,res)
{
	Sprint.find({},function(err, doc){	 
		res.json({"data":doc});		  
	});	
});




require('./app/routes/users.js')(app, passport);
app.use('/', routes);
app.use('/api/',taskApi);




app.use(errorHandler);

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});

var mongoose	= 	require('mongoose');
var express		=	require('express');
var Task		= 	require('./app/models/tasks.js');
var Project		=	require('./app/models/project.js');
var User		= 	require('./app/models/user');
var Sprint		= 	require('./app/models/sprint.js');
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

app.get('/test',function(req, res, next) {  
    res.render('index');
});

app.get('/home', function(req, res, next) {  
    res.render('index');
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
		    
             
			Sprint.update({working:req.params.id},{ $pullAll: {working: [req.params.id] }},function(err, task) {

				
				Sprint.update({stage:req.params.id},{ $pullAll: {stage: [req.params.id] }},function(err, task) {

					Sprint.update({prod:req.params.id},{ $pullAll: {prod: [req.params.id] }},function(err, task) {

						res.json({"data":task});

					});	

				});	

			});	
				

			
	   });	  	  
	});
});



app.post('/addTask',function(req, res){
	console.log(req.body);
	var sprintId=req.body._id;
	var desc=req.body.desc;
	var type=req.body.type;
	   TaskObj = {
           id:req.body._id,
		   priority:req.body.pri,
		   name:req.body.name,
		   description:desc,
		   type:type,
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

app.post('/updateTaskPos',function(req, res){
	
	var sprintId=req.body._id;
	var pos=req.body.pos;
	var posWorking=req.body.posOfWorking;
	var posStage=req.body.posOfStage;
	var posProd=req.body.posOfProd;
	
	var taskId=req.body.tid;
	var result=[];
	
	 Sprint.update({tasks:taskId},{ $pullAll: {tasks: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {tasks: {$each: [taskId], $position: pos}}},function(err, doc) {
			
			result.push({"data":doc});			 
			Sprint.update({working:taskId},{ $pullAll: {working: [taskId] }},function(err, doc) {			
				Sprint.update({ _id:sprintId },{$push: {working: {$each: [taskId], $position: posWorking}}},function(err, doc) {
					result.push({"data":doc});
					
					Sprint.update({stage:taskId},{ $pullAll: {stage: [taskId] }},function(err, doc) {  
						Sprint.update({ _id:sprintId },{$push: {stage: {$each: [taskId], $position: posStage}}},function(err, doc) {
							result.push({"data":doc});
						
						 
							Sprint.update({prod:taskId},{ $pullAll: {prod: [taskId] }},function(err, doc) {  
								Sprint.update({ _id:sprintId },{$push: {prod: {$each: [taskId], $position: posProd}}},function(err, doc) {
									result.push({"data":doc});

									res.json(result);
								})
							});								 
						})
					});	

				})

			});	
			
		})
			
	 });	
	   
	   
	   


	
});





app.post('/updateTaskPos1',function(req, res){
	
	var sprintId=req.body._id;
	var pos=req.body.pos;
	var posWorking=req.body.posOfWorking;
	var posStage=req.body.posOfStage;
	var posProd=req.body.posOfProd;
	
	var taskId=req.body.tid;
	var result=[];
	
	 Sprint.update({tasks:taskId},{ $pullAll: {tasks: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {tasks: {$each: [taskId], $position: pos}}},function(err, doc) {
			
			 result.push({"data":doc});
			
		})
			
	   });	
	   
	    Sprint.update({working:taskId},{ $pullAll: {working: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {working: {$each: [taskId], $position: posWorking}}},function(err, doc) {
			
			 result.push({"data":doc});
			
		})
			
	   });	
	   
	    Sprint.update({stage:taskId},{ $pullAll: {stage: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {stage: {$each: [taskId], $position: posStage}}},function(err, doc) {
			
			  result.push({"data":doc});
			
		})
			
	   });	

	    res.json(result);
	
});

app.post('/project',function(req,res){
	console.log(req.body);
	var userId=req.user._id;
	var name= req.user.local.fname+" "+req.user.local.lname
	var member={
		name: name,
		userid : userId,
        userdp : "no dp"		 
	 };
	console.log("userId");
	console.log(userId);
	var projectData={
		name:req.body.name,
		desc:req.body.desc,
        createdBy:userId,
		startDate:req.body.startDate,		
		endDate:req.body.endDate,		
	};

	var project=new Project(projectData);
	project.members.push(member);
	project.save(function(err,doc){
		 if (err || !doc) {
            throw 'Error';
        } else {
            res.json({"data":doc});
        }		
	});	
});

app.put('/project',function(req,res){
	console.log(req.body);
	var projectData=req.body.project;	
	Project.findById(projectData._id, function (err, project) {	
        project.name=projectData.name;		
        project.desc=projectData.desc;		
        project.completed=projectData.completed;		
		project.save(function (err) {		
			res.json({"data":project});
		});
	});	
});

app.get('/project',function(req, res, next){
	var userId=req.user._id;	
	Project.find({'members.userid':userId},null,{sort:{'_id':-1}},function(err, doc) {	 
	   res.json({"data":doc});		  
	});
});

app.get('/project/:id',function(req,res){
	Project.find({_id: req.params.id},function(err, doc){	 
	   res.json({"data":doc});		  
	});	
});

app.delete('/project/:id',function(req,res){	 
	  Project.remove({_id: req.params.id},function(err, project){
		  response={status:"not"};
		  console.log(project.ok);
		    console.log(project);
		  if(project.result.ok==1)
		  {
            response.status="ok"
		  }
		  res.json({"data":response});
	  }); 
});

app.post('/project/addProjectMember',function(req, res, next){
	var projectId=req.body._id;
	var userId=req.body.userId;
	User.find({_id:userId},function(err,user){		
		console.log("user id"+userId);		
		console.log(user);
		var name=user[0].local;	
		var member={
		name: name.fname,
		userid : userId,
		userdp : "no dp"		 
		};
		 
		Project.find({'members.userid':userId,_id:projectId},function(err, doc) {		
		
		var send={
				"doc":"alread",
				"erro":doc,
				"member":"already",
				};
			
			if(doc=="" || doc==null)
			Project.findOneAndUpdate({_id:projectId}, {$push: {members: member}}, function(err,project){
				var send={
				"doc":project,
				"erro":doc,
				"member":member,
				};
				Project.find({_id:projectId},function(err, doc) {	
					res.json({"data":doc});
				});			
			});			
			else
				res.json({"data":doc});
				
	
		
		});
		
		
		 
	});
});




app.get('/users',function(req,res)
{
 User.find({},function(err, doc){	 
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


app.delete('/sprint/:id',function(req,res)
{
	Sprint.remove({_id: req.params.id},function(err, doc){	 

		response={status:"not"};
		if(doc.result.ok==1)
		{
          response.status="ok";
		}
		res.json({"data":response});		  
	});
	
});

app.get('/sprint',function(req,res)
{
	Sprint.find({},function(err, doc){	 
		res.json({"data":doc});		  
	});	
});

app.get('/sprintById/:sprintId',function(req,res)
{
	Sprint.find({_id:req.params.sprintId},function(err, doc){	 
		res.json({"data":doc});		  
	});	
});




function isLoggedIn(req, res, next) {
console.log(req.user)
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
 
    // if they aren't redirect them to the home page
    res.redirect('/');
}

require('./app/routes/users.js')(app, passport);
app.use('/', routes);
app.use('/api/',taskApi);




app.use(errorHandler);

var server = app.listen(3001, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});

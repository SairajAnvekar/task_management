import { Component , OnInit,Input} from '@angular/core';
import {Task} from '../models/task';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'my-tasks1',
  templateUrl: 'views/app/component/templates/task.component.html',  
   styleUrls: [
        'views/app/component/templates/css/style.css',      
    ],	
	

  	viewProviders: [DragulaService],
    providers: [TaskService,UserService]
})
export class TaskComponent1 implements OnInit {
	title="Tasks";
	@Input()
	sprint:any;
	users:any;
	
	mapTasks:{[id:string]:any}={};	  
	sprintUpadated:any;
	errorMessage: string;
	sprintTask=[];
	workingTask=[];
	stageTask=[];
	prodTask=[];
	activeAdd=true;
	task1: Task ={
					id: 1,
					name: 'Build App',
					 piority:1
				};
				
	tasks:Task[]; 
	selectedTask: any;
	onSelect(task: Task): void {
			this.selectedTask = task;
		}

    public constructor(private dragulaService:DragulaService,private taskService:TaskService,private sprintService: SprintService,private userService: UserService) {
	  
		dragulaService.dropModel.subscribe((value:any) => {
		this.onDropModel(value.slice(1));

		});
		
		dragulaService.drop.subscribe((value) => {
		//let [bagName, e, el] = value;
	
		});
		
	
	
  }
	
	
	private onDropModel(args:any):void {
		let [el, target, source] = args;		
	    var tid=el.querySelector('.tid').value;
		var idxOfTask=this.sprintTask.indexOf(tid);		
		var  idxOfWorking=this.workingTask.indexOf(tid);
		var  idxOfStage=this.stageTask.indexOf(tid);
		var  idxOfProd=this.prodTask.indexOf(tid);
		
		
		
		console.log(this.sprint._id);
		console.log(target);
		console.log(source);
		this.taskService.updateTaskPosition(this.sprint._id,tid,idxOfTask,idxOfWorking,idxOfStage,idxOfProd)
					 .subscribe(
					   task  =>{						   
							console.log(task);
							},
					   error =>  this.errorMessage = <any>error);
		
	}
	
	
	getTasks(): void {
	//	this.taskService.getTasks().then(tasks => this.tasks = tasks);;
	}
  
	ngOnInit(): void {
		this.getTasksOb();	
		this.getSprintDetails(this.sprint._id);
		this.getUsers();
        	
	}
	
	/// using promise call
		getHeroes2() {
		this.taskService.getHeroes1()
					 .then(
					   tasks => this.tasks = tasks,
					   error =>  this.errorMessage = <any>error);
		}

	
	
	
	getTasksOb() {
		var sprintId=this.sprint._id;
		this.taskService.getTaskApi(sprintId).subscribe(
			tasks => {this.tasks = tasks,console.log(this.tasks),this.setMapTasks(tasks)},
			error =>  this.errorMessage = <any>error
		);
	}
	
	add(name: string,_id: string ,pri:number,desc:string,type:string): void {
	   name = name.trim();		
        _id=this.sprint._id;
			this.taskService.addTask(name,_id,pri,desc,type)
					 .subscribe(
					   task  =>{						   
							this.sprintTask.push(task['_id']);						
						    this.tasks.push(task);
							this.mapTasks[task['_id']]={
															'_id':task['_id'],
															'name':task['name'],
															'status':task['status']

							}		

							},
					   error =>  this.errorMessage = <any>error);
		     
		
		
	}
	
	updateTask(_id: string ): void {
			
	    var editTask=this.selectedTask;
     
			this.taskService.updateTask(editTask)
					 .subscribe(
					   task  =>{this.mapTasks[task['_id']]={
															'_id':task['_id'],
															'name':task['name'],
															'status':task['status']

							};console.log("task");console.log(task)	},
					   error =>  this.errorMessage = <any>error);
		     
		
		
	}
	
	delete(task): void {
			this.taskService.deleteTask(task._id).subscribe(
	  tasks1 => {
				
				 delete this.mapTasks[task._id];
				 this.deleteFromArray(task);
				
				console.log(this.sprintTask);
				
				this.getTasksOb();
			},
			error =>  this.errorMessage = <any>error
		);
			
	}
	
	
	
	deleteFromArray(task)
	{
		var idx = this.sprintTask.indexOf(task._id);
				if (idx != -1) {
				   this.sprintTask.splice(idx, 1); // The second parameter is the number of elements to remove.
				} 
		idx = this.workingTask.indexOf(task._id);
				if (idx != -1) {
				   this.workingTask.splice(idx, 1); // The second parameter is the number of elements to remove.
				} 
		idx = this.stageTask.indexOf(task._id);
				if (idx != -1) {
				   this.stageTask.splice(idx, 1); 
				}
		idx = this.prodTask.indexOf(task._id);
				if (idx != -1) {
				   this.prodTask.splice(idx, 1); 
				}		
	}
	
	
	getSprintDetails(_id)
	{
		this.sprintService.getSprintDetails(_id).subscribe(
		
			sprint=>{this.sprintUpadated=sprint;		
				this.sprintTask=sprint[0].tasks;
				this.workingTask=sprint[0].working;
				this.stageTask=sprint[0].stage;
				this.prodTask=sprint[0].prod;		  
			  }
		
		);
	}
	
	
	setMapTasks(tasks)
	{   
	console.log("enter");
	console.log(tasks);
	var temp= new Array();
		for(var i=0;i<tasks.length;i++)
		{
			 
			
			this.mapTasks[tasks[i]._id]={
				'_id':tasks[i]._id,
				'name':tasks[i].name,
				'desc':tasks[i].description,
				'type':tasks[i].type,
				'priority':tasks[i].priority,			
				
			}		
			
			
		}
		
		console.log("out");
		
		console.log(this.mapTasks);	
	}
	
	
	cancel()
	{		
		//$('.form-style-5').hide();
		this.activeAdd=true;
	}
	
	showAdd()
	{
		//$('.form-style-5').show();
		this.activeAdd=false;		
	}
	
	//users functions
	
	getUsers() {		
		this.userService.getUsers().subscribe(
			users => {this.users = users;console.log("users");console.log(users)},
			error =>  this.errorMessage = <any>error
		);
	}
	
	
	
	addComment(comment): void {
			
	    var taskId=this.selectedTask._id;
     
			this.taskService.addTaskComment(taskId,comment)
					 .subscribe(
					   task  =>{console.log("taskaddd");console.log(task)	},
					   error =>  this.errorMessage = <any>error);
		     
		
		
	}
	
	
}






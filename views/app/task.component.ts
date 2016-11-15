import { Component , OnInit} from '@angular/core';
import {Task} from './task';
import { TaskService } from './task.service';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'my-tasks',
  template: `<h1>{{title}}</h1> 
  
	<div>
	<label>Hero name:</label> 
	<input #taskname />
	<input #taskId />
	<input #taskPiority />
	<button (click)="add(taskname.value,taskId.value,taskPiority.value); taskname.value='' ">
	Add
	</button>
	</div>
  
	<ul class="tasks">
      <li *ngFor="let task of tasks; let i = index"  (click)="onSelect(task)" >
        <span class="badge">{{i+1}}</span> {{task.name}}
		<button class="delete" (click)="delete(task); $event.stopPropagation()">x</button>
      </li>
    </ul>
	
  <task-detail [task]="selectedTask"></task-detail>

	
	`,
	 styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .tasks {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .tasks li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .tasks li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .tasks li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .tasks .text {
      position: relative;
      top: -3px;
    }
    .tasks .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
	
	button.delete {
		float:right;
		margin-top: 2px;
		margin-right: .8em;
		background-color: gray !important;
		color:white;
	}
  `],
    providers: [TaskService]
})
export class TaskComponent implements OnInit {
	title="Tasks";
	errorMessage: string;
	task: Task ={
					id: 1,
					name: 'Build App',
					 piority:1
				};
				
	tasks:Task[]; 
	selectedTask: Task;
	onSelect(task: Task): void {
			this.selectedTask = task;
		}

	constructor(private taskService:TaskService) { }	
	getTasks(): void {
	//	this.taskService.getTasks().then(tasks => this.tasks = tasks);;
	}
  
	ngOnInit(): void {
		this.getTasksOb();
	
	}
	
	
	
	/// using promise call
		getHeroes2() {
		this.taskService.getHeroes1()
					 .then(
					   tasks => this.tasks = tasks,
					   error =>  this.errorMessage = <any>error);
		}

	
	
	
	getTasksOb() {
		this.taskService.getTaskApi().subscribe(
			tasks => this.tasks = tasks,
			error =>  this.errorMessage = <any>error
		);
	}
	
	
	

	
	add(name: string,_id: string ,pri:number): void {
	   name = name.trim();		

			this.taskService.addTask(name,_id,pri)
					 .subscribe(
					   task  =>this.tasks.push(task),
					   error =>  this.errorMessage = <any>error);
		
		
		
	}
	
	delete(task): void {
			this.taskService.deleteTask(task._id).subscribe(
	  tasks1 => {
				this.getTasksOb();
			},
			error =>  this.errorMessage = <any>error
		);
			
	}
	
	
	
	
}






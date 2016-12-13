import { Component, Input } from '@angular/core';
import {Task} from '../models/task';
@Component({
  selector: 'task-detail1',
  template:`<div *ngIf="task">
		<h2>{{task.name}} details!</h2>
		<div><label>id: </label>{{task.id}}</div>
		<div><label>id: </label>{{task._id}}</div>
			<div><label>piority: </label>{{task.priority}}</div>
		<div>
			<label>name: </label>
			<input [(ngModel)]="task.name" placeholder="name"/>
		</div>
		
		{{demo|json}}
			{{demo['t'] | json}}
	</div>		
	
	`
})
export class TaskDetailComponent1 {
	@Input()
	task:Task;
	
	 demo={
		"t":[{'no':1}],
		"s":[{'no':2}],		
	};
	
}
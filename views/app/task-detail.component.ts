import { Component, Input } from '@angular/core';
import {Task} from './task';
@Component({
  selector: 'task-detail',
  template:`<div *ngIf="task">
		<h2>{{task.name}} details!</h2>
		<div><label>id: </label>{{task.id}}</div>
		<div>
			<label>name: </label>
			<input [(ngModel)]="task.name" placeholder="name"/>
		</div>
	</div>	
	
	
	`
})
export class TaskDetailComponent {
	@Input()
	task:Task;

}
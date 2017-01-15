import { Component, Input } from '@angular/core';
import {Task} from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'task-detail1',
  templateUrl: 'views/app/component/templates/task-detail.component.html',  
})
export class TaskDetailComponent1 {
	@Input()
	task:Task;
	
	 demo={
		"t":[{'no':1}],
		"s":[{'no':2}],		
	};
	
	
	
	
}
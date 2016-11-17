import { Component ,OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { TaskService } from './task.service';
import {Task} from './task';
@Component({
  selector: 'my-dashboard',
  template: `
   <div class='wrapper'>
        <div class='container' *ngFor='let group of groups' [dragula]="'nested-bag'" [dragulaModel]='group.items'>
            <span>{{group.name}}</span>
            <div *ngFor='let item of group.items' [innerHtml]='item'>
			</div>
        </div>
    </div>
	
	<div>
	
   <pre>{{groups | json}}</pre>
	</div>
  
	`,
	viewProviders: [DragulaService],
    providers: [TaskService]

})
export class DashboardComponent   { 
  public many:Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  public many2:Array<string> = [];
  tasks:Task[]; 
  errorMessage: string;
   public groups: Array<any> = [
    {
      name: 'Group A',
      items: ['Item A','Item B','Item C','Item D']
    },
    {
      name: 'Group B',
      items: ['Item 1','Item 2','Item 3','Item 4']
    }
  ];

  public constructor(private dragulaService:DragulaService) {
	  
	  dragulaService.dropModel.subscribe((value:any) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value:any) => {
      this.onRemoveModel(value.slice(1));
    });
		
		dragulaService.drop.subscribe((value) => {
		this.onDrop(value.slice(1));
		});

		
		
   
  }
  
  
  
   private onDropModel(args:any):void {
    let [el, target, source] = args;
    console.log('onDropModel:');
    console.log(el);
    console.log(target);
    console.log(source);
  }

    private onDrop(args) {
    let [e, el] = args;
    console.log(e);
  }
	
	
	
	  private onRemoveModel(args:any):void {
    let [el, source] = args;
    console.log('onRemoveModel:');
    console.log(el);
    console.log(source);
  }
	
	




}
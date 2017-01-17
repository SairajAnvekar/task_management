import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaskComponent }   from './task.component';
import { FormsModule }   from '@angular/forms';
import { TaskDetailComponent } from './task-detail.component';
import { AppComponent }        from './app.component';
import { RouterModule }   from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { HttpModule }    from '@angular/http';
import { Dragula } from 'ng2-dragula/ng2-dragula';
import {ProjectComponent }   from './component/project.component';
import {ProjectDetailComponent }   from './component/project-detail.component';
import {LocationStrategy, HashLocationStrategy}  from '@angular/common';
import { TaskDetailComponent1 } from './component/task-detail.component';
import { TaskComponent1 } from './component/task.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import {Tabs} from './component/tabs';
import {Tab} from './component/tab';
@NgModule({
imports:[
	BrowserModule, 
	FormsModule,
	HttpModule,
 
	Ng2DatetimePickerModule,
	RouterModule.forRoot([
	   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
		{
			path: 'tasks',
			component: TaskComponent
		},
		{ 
			path: 'dashboard', 
			component: DashboardComponent 
		},
		{ 
			path: 'project', 
			component: ProjectComponent 
		},
		{ 
			path: 'detail/:id', 
			component: ProjectDetailComponent 
		},

	])
  
  ],
  declarations: [AppComponent,TaskComponent ,TaskComponent1,Dragula, TaskDetailComponent,TaskDetailComponent1 , DashboardComponent,ProjectComponent,ProjectDetailComponent,Tab,Tabs],
  bootstrap:    [ AppComponent ], 
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule { }
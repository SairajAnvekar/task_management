import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TaskComponent }   from './task.component';
import { FormsModule }   from '@angular/forms';
import { TaskDetailComponent } from './task-detail.component';
import { AppComponent }        from './app.component';
import { RouterModule }   from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { HttpModule }    from '@angular/http';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import {ProjectComponent }   from './component/project.component';
import {ProjectDetailComponent }   from './component/project-detail.component';
import {LocationStrategy, HashLocationStrategy}  from '@angular/common';
import { TaskDetailComponent1 } from './component/task-detail.component';
import { TaskComponent1 } from './component/task.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";
import {Tabs} from './component/tabs';
import {Tab} from './component/tab';

@NgModule({
imports:[
	BrowserModule, 
	FormsModule,
	HttpModule,
    DragulaModule,
	Ng2DatetimePickerModule,
	RouterModule.forRoot([
	   { path: '', redirectTo: '/project', pathMatch: 'full' },
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
		{ 
			path: 'sprintDetails/:id', 
			component: TaskComponent1 
		},

	])
  
  ],
  declarations: [AppComponent,TaskComponent ,TaskComponent1, TaskDetailComponent,TaskDetailComponent1 , DashboardComponent,ProjectComponent,ProjectDetailComponent, Tabs, Tab, CalendarComponent],
  bootstrap:    [ AppComponent ], 
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule { }
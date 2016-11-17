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
@NgModule({
imports:[
	BrowserModule, 
	FormsModule,
	HttpModule,
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
	])
  
  ],
  declarations: [AppComponent,TaskComponent , TaskDetailComponent ,  DashboardComponent,Dragula],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
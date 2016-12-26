import { Component ,OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../task.service';
import { Http, Response } from '@angular/http';
import {Project} from '../models/project';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'my-project',
  template: `
   <h1>Project Management1s</h1>
   	<div>
	<label>Project</label> 
	<input #name />
	<input #desc />
	<button (click)="create(name.value,desc.value); name.value='';desc.value='' ">
	Add
	</button>
	</div>
	
	
	<ul class="projects"  >
		<li *ngFor="let project of projects; let i = index"  (click)="onSelect(project)" >
			<span class="badge">{{i+1}}</span> 
				{{project.name}}
		</li>
	</ul>
	
	
	<button (click)="gotoDetail()">View Details</button>
	`,
	 providers: [ProjectService],

	})
export class ProjectComponent implements OnInit   { 
 
	errorMessage: string;
    projects:Project[]; 
	public constructor(private router: Router,private projectService:ProjectService) {}	
	selectedProject: Project;
	ngOnInit(): void {
		this.getProjects();
	
	}
	
	onSelect(project: Project): void {
		this.selectedProject = project;		
	}
	
	create(name: string,desc: string): void {
		name = name.trim();	
		console.log(name);
		this.projectService.createProject(name,desc)
						 .subscribe(
						   project  =>console.log(project),
						   error =>  this.errorMessage = <any>error);
	}
	
	getProjects() {
		this.projectService.getProjects().subscribe(
			projects => this.projects = projects,
			error =>  this.errorMessage = <any>error
		);
	}
	
	
	gotoDetail(): void {
		this.router.navigate(['/detail',this.selectedProject._id]);
		console.log("test");
	}



}
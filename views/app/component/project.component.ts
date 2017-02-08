import { Component ,OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../task.service';
import { Http, Response } from '@angular/http';
import {Project} from '../models/project';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'my-project',
   templateUrl: 'views/app/component/templates/project.component.html',
	 providers: [ProjectService],

	})
export class ProjectComponent implements OnInit   { 
 
	errorMessage: string;
    projects:Project[]; 
	activeAddDetails=true;
	progress=" c100 green ";
	percentage=" p45";
	public constructor(private router: Router,private projectService:ProjectService) {}	
	selectedProject: Project;
	ngOnInit(): void {
		this.getProjects();
	
	}
	
	onSelect(project: Project): void {
		this.selectedProject = project;	
        this.gotoDetail();		
	}
	
	create(name: string,desc: string,sdate:any,endDate:any): void {
		name = name.trim();	
		console.log(sdate);
		this.projectService.createProject(name,desc,sdate,endDate)
						 .subscribe(
						   project  =>console.log(project),
						   error =>  this.errorMessage = <any>error);
		this.getProjects();
	}
	
	getProjects() {
		this.projectService.getProjects().subscribe(
			projects => this.projects = projects,
			error =>  this.errorMessage = <any>error
		);
	}
	
	deleteProject(projectId)
	{
		this.projectService.deleteProject(projectId).subscribe(project=> {
		if(project.status=="ok"){ 
          console.log("deleted");
		  for(var i=0; i<this.projects.length; i++){
                if(this.projects[i]._id == projectId){
                    this.projects.splice(i, 1);
                }
            }
		}
		});
	}
	

	gotoDetail(): void {
		this.router.navigate(['/detail',this.selectedProject._id]);
		console.log("test");
	}
	
    showAddDetails(): void{
		this.activeAddDetails=false;
		
	}
	cancel(){		
		this.activeAddDetails=true;	
	}
	


}
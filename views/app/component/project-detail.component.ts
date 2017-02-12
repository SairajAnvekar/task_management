import { Component ,OnInit,Input } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';
import { UserService } from '../services/user.service';
import { Http, Response } from '@angular/http';
import {Project} from '../models/project';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
@Component({
	moduleId: module.id,
	selector: 'my-project1',
	templateUrl: '/../views/app/component/templates/project-detail.component.html',
	providers: [ProjectService,SprintService,UserService],

	})
export class ProjectDetailComponent implements OnInit { 
    
    project:any={};
	progress=" c100 green ";
	percentage=" p45";
	sprints:any;
	errorMessage :string;
	currentSprint:any;
	users:any;
	projectDetails;
	title="Tasks";	
	constructor(
		private projectService: ProjectService, 
		private sprintService: SprintService,
		private userService:UserService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) {}
	
	ngOnInit(): void {	
	        var id;
			this.route.params.forEach((params: Params) => {
		    id = params['id'];
			this.projectService.getProject(id).subscribe(
			project1 =>{
				this.project=project1[0];console.log("eeeeeeeeeeeeeeee");this.title=project1[0].name;this.projectDetails=project1},
			error =>  this.errorMessage = <any>error
		);
			
			});
			
	   this.getTasksOb(id)	;
	   this.getUsers();
	   console.log("data"); 
	   console.log(this.project);
	 
       
	}

	create(name: string,desc: string): void {
		this.sprintService.createSprint(name,desc,this.project._id)
						  .subscribe(project  =>console.log(project),
										error =>  this.errorMessage = <any>error);
		this.getTasksOb(this.project._id);
	}
	
	
	update(project:any)
	{
		this.projectService.updateProject(project).subscribe(project  =>console.log(project),
										error =>  this.errorMessage = <any>error);
									
	}
	
	getTasksOb(projectid) {
		this.sprintService.getProjectSprint(projectid).subscribe(
		sprints =>{this.sprints = sprints;console.log("data");console.log(this.sprints)},
			error =>  this.errorMessage = <any>error
		);
	}
	
	onSelect(sprint: any): void {
		this.currentSprint = sprint;
        this.router.navigate(['/sprintDetails',this.currentSprint._id]);
		console.log("current sprint");		
		console.log(this.currentSprint);		
	}
	
	addTask(name: string,status: string ): void {
		name = name.trim();		

		this.sprintService.addTask(name,status,this.currentSprint._id)
				 .subscribe(
				   task  =>console.log(task),
				   error =>  this.errorMessage = <any>error);

	}
	
	
	getUsers() {		
		this.userService.getUsers().subscribe(
			users => {this.users = users;console.log("users");console.log(users)},
			error =>  this.errorMessage = <any>error
		);
	}
	
	addMember(member:string)
	{
	this.projectService.addMember(this.project._id,member)
						 .subscribe(
						 project  =>{this.project=project[0];console.log("wwwwwwwwwwwwww");console.log(project)},
						   error =>  this.errorMessage = <any>error);
		
	}
	
	deleteSprint(id){
       this.sprintService.deleteSprint(id).subscribe(sprint=> {
		console.log("s1");
			console.log(sprint);
       if(sprint.status=="ok"){
			for(var i=0 ; i< this.sprints.length; i++){

                console.log(this.sprints[i]);
				if(this.sprints[i]._id==id){			
					this.sprints.splice(i,1);
				}

			}
	   }

	   });
	}
	
	

}
import { Component ,OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';
import { Http, Response } from '@angular/http';
import {Project} from '../models/project';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
@Component({
  moduleId: module.id,
  selector: 'my-project',
  templateUrl: 'templates/project-detail.component.html',
	 providers: [ProjectService,SprintService],

	})
export class ProjectDetailComponent implements OnInit { 
      project:Project;
	  errorMessage :string;
	constructor(
	  private projectService: ProjectService, 
	  private sprintService: SprintService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}
	
	ngOnInit(): void {	
			this.route.params.forEach((params: Params) => {
			 var id = params['id'];
			this.projectService.getProject(id).subscribe(
			project1 =>{this.project=project1[0];console.log(project1[0])},
			error =>  this.errorMessage = <any>error
		);
			
			});
	  console.log("data"); 
	  console.log(this.project);	  
	}

	create(name: string,status: string): void {	

	this.sprintService.createSprint(name,status,this.project._id)
						 .subscribe(
						   project  =>console.log(project),
						   error =>  this.errorMessage = <any>error);
	}
	
	
	
	
	

}
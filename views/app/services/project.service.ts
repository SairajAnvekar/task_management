import { Injectable } from '@angular/core';
import {Project} from '../models/project';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'; 
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ProjectService {
private appUrl= 'project';  // URL to web API
	constructor (private http: Http) {}

	getProjects (): Observable<Project[]> {
	 return this.http.get(this.appUrl).map(this.extractData).catch(this.handleError);
	}
	
	
	getProject(_id): Observable<Project> {
		return this.http.get(this.appUrl+'/'+_id).map(this.extractData).catch(this.handleError);
	}
	
	createProject (name: string ,desc:string,startDate:any,endDate:any): Observable<Project> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });     
		return this.http.post(this.appUrl, { name ,desc,startDate,endDate}, options)
					.map(this.extractData)
					.catch(this.handleError);
	}
	
	
	updateProject (project:any): Observable<Project> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });     
		return this.http.put(this.appUrl, {project}, options)
					.map(this.extractData)
					.catch(this.handleError);
	}	
	
	addMember(_id: string ,userId:string): Observable<any[]> {
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });     
	return this.http.post(this.appUrl+'/addProjectMember', { _id ,userId}, options)
				.map(this.extractData)
				.catch(this.handleError);
	}	
		

	deleteProject(project_id):Observable<any> {		
		return this.http.delete(this.appUrl+'/'+ project_id).map(this.extractData).catch(this.handleError);
	}	
	

	private extractData(res: Response) {
		console.log(res);
		let body = res.json();
		return body.data || { };
	}
	private handleError (error: Response | any) {
	// In a real world app, we might use a remote logging infrastructure
	let errMsg: string;
	if (error instanceof Response) {
	  const body = error.json() || '';
	  const err = body.error || JSON.stringify(body);
	  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	} else {
	  errMsg = error.message ? error.message : error.toString();
	}
	console.error(errMsg);
	return Observable.throw(errMsg);
	}

 
 

}
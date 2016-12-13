import { Injectable } from '@angular/core';
import {Project} from '../models/project';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'; 
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class SprintService {
private appUrl= 'sprint';  // URL to web API
	constructor (private http: Http) {}
      
	getProjects (): Observable<Project[]> {
		return this.http.get(this.appUrl).map(this.extractData).catch(this.handleError);
	}
	
	
	getProjectSprint(projectId): Observable<any[]> {
		return this.http.get(this.appUrl+'/'+projectId).map(this.extractData).catch(this.handleError);
	}
	
	
	
	getSprintDetails(sprintId): Observable<any[]> {
		return this.http.get('api/sprint/'+sprintId).map(this.extractData).catch(this.handleError);
	}
		
	createSprint (name: string ,status:string,projectId:string): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });     
		return this.http.post(this.appUrl, { name ,status,projectId}, options)
					.map(this.extractData)
					.catch(this.handleError);
	}	
	


	addTask (name: string ,status:string,sId:string): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });     
		return this.http.post('api/addTask', { name ,status,sId}, options)
					.map(this.extractData)
					.catch(this.handleError);
	}	
		
		

	private extractData(res: Response) {	
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
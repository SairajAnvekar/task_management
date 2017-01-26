import { Injectable } from '@angular/core';
import {Project} from '../models/project';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx'; 
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class UserService {
private appUrl= 'users';  // URL to web API
	constructor (private http: Http) {}
      
	getUsers (): Observable<Project[]> {
		return this.http.get(this.appUrl).map(this.extractData).catch(this.handleError);
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
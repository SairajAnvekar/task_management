import { Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
  <a routerLink="/tasks">task</a>
  <a routerLink="/dashboard">Dash</a>
    <a routerLink="/project">project</a>
   <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Task Management';
}






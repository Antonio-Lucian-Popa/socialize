import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isSideNav = false;

  routerEvents: any;

  constructor(private router: Router) {
    this.routerEvents = this.router.events.subscribe(
      (event:any)=>{
        if(event instanceof NavigationEnd){
          console.log(event.url);
          if(event.url === "/register" || event.url === "/login") {
            this.isSideNav = false;
          } else {
            this.isSideNav = true;
          }
        }
      }
    )
  }

  ngOnInit(): void {
    initFlowbite();
  }
}

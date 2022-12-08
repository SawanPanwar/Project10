import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
    console.log('in dashboard component')
  }

  ngOnInit() {
    console.log('in ng on init dashboard component')
  }

}

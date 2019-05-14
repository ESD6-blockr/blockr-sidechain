import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'blockr-feedback-frontend';
// }

//import { Component, OnInit } from '@angular/core';


import {Router} from '@angular/router';
import {MatDialog} from '@angular/material'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
 
  }
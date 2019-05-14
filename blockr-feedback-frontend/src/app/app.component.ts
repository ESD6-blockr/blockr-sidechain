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
publicKey: string;
privateKey: string;

  ngOnInit() {
  }
  login() : void {
    console.log("Hij komt hier")
    console.log(this.publicKey);
    console.log(this.privateKey);
    if(this.publicKey == "admin" && this.privateKey == "admin"){
      alert("succes")
    }
    else if(this.publicKey == "" || this.privateKey == "" || (this.publicKey == "" && this.privateKey == "" )){
      alert("Niet alle velden zijn ingevuld")
    }
    else{
      alert("Combinatie van public key en private key bestaat niet")
    }
  }

  }
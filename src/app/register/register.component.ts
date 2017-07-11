import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, public app: AppComponent) { }

  redirectToLogin(){
    this.router.navigate(['login']);
  }

  ngOnInit() {
    if(this.app.isLoggedIn !== false){
      this.router.navigate(['']);
    }
  }

}

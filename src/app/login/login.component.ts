import { Component, OnInit } from '@angular/core';
import { AuthService } from ".././providers/auth.service";
import { Router, RouterModule } from "@angular/router";
import { AppComponent } from '../app.component';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _auth: AuthService, public router:Router, public app: AppComponent) { }

  login() {
    // return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this._auth.loginWithGoogle().then((data) => {
      this.router.navigate([''])
    });
  }

  redirectToRegister(){
    this.router.navigate(['register']);
  }

  logOut() {
    this._auth.logout();
    console.log("out");
  }

  ngOnInit() {
    if(this.app.isLoggedIn !== false){
      this.router.navigate(['about']);
    }
  }

}

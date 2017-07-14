import { Component, OnInit } from '@angular/core';
import { AuthService } from ".././providers/auth.service";
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public alert: boolean = false;
  public alertMessage;
  public alertType;

  constructor(public _auth: AuthService, public router:Router, public app: AppComponent) { }

  loginG() {
    this._auth.loginWithGoogle().then((data) => {
      this.router.navigate([''])
    });
  }

  loginFB(){
    this._auth.loginWithFacebook().then((data) => {
      this.router.navigate(['']);
    });
  }

  login(){
    this.alertType = "warning";
    this.alert = true;
    this.alertMessage = "Method not implemented yet! Try Facebook or Google login";
  }

  forgetPassword(){
    this.alertType = "warning";
    this.alert = true;
    this.alertMessage = "Method not implemented yet! Developers working on it";
  }

  adminLogin(email: string, password: string) {
    this._auth.loginWithEmail(email, password).then((data) => {
      this.alert = false;
      this.router.navigate(['']);
    }).catch((e) => {
      this.alertType = "danger";
      this.alert = true;
      console.log(e);
      this.alertMessage = e.message;
    });
  }

  redirectToRegister(){
    this.router.navigate(['register']);
  }

  logOut() {
    this._auth.logout();
    console.log("out");
  }

  reset(){
    this.alert = false;
  }

  ngOnInit() {
    if(this.app.isLoggedIn !== false){
      this.router.navigate(['about']);
    }
  }

}

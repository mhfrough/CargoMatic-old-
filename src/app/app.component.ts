import { Component, ViewChild } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;
  adminLog: boolean;
  constructor(public _auth: AuthService, private router: Router) {
    this._auth.af.authState.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          console.log("Successfully Logged in.");
          if(this._auth.af.auth.currentUser.displayName){
            this.adminLog =  false;
            this._auth.displayName = auth.displayName;
            this._auth.emailAddress = auth.email;
          } else {
            this.adminLog = true;
            this._auth.displayName = _auth.getName;
            this._auth.emailAddress = auth.email;
          }
          this.isLoggedIn = true;
        }
      }
    );
  }

  logout(){
    this._auth.logout();
  }
}

import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayName;
  isLoggedIn: boolean;
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
          this._auth.displayName = auth.displayName;
          this._auth.emailAddress = auth.email;
          this.isLoggedIn = true;
        }
      }
    );
  }
  logout(){
    this._auth.logout();
  }
}

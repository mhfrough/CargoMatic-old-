import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AuthService } from '.././providers/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public error: any;

  constructor(public _auth: AuthService, public router: Router, public app: AppComponent) { }

  redirectToLogin(){
    this.router.navigate(['login']);
  }

  adminLogin(name: string, email: string, password: string) {
    return this._auth.registerAdmin(email, password).then((user) => {
      this._auth.saveAdminInfo(user.uid, name, email).then((data) => {
        this.router.navigate(['']);
        console.log(user);
      })
    })
  }

  ngOnInit() {
    if(this.app.isLoggedIn !== false){
      this.router.navigate(['']);
    }
  }

}

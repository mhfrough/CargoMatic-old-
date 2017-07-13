import { Component, OnInit } from '@angular/core';
import { AuthService } from '.././providers/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public _auth: AuthService) { }

  ngOnInit() {
    if(!this._auth.af.auth.currentUser.displayName){
      this._auth.displayName = this._auth.getName;
    }
  }

}

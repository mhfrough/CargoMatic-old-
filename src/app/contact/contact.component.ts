import { Component, OnInit } from '@angular/core';
import { AuthService } from '.././providers/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public _auth: AuthService, public router:Router) { }

  ngOnInit() {
    if(!this._auth.af.auth.currentUser.displayName){
      this.router.navigate(['']);
    }
  }

}

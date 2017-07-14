import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { AuthService } from ".././providers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  clientPackages : FirebaseListObservable<any[]>

  constructor(public _auth: AuthService, public router:Router) {
    this.items = this._auth.db.list('/registeredAdmin');
    this.clientPackages = this._auth.db.list('/shipping');
  }

  delete(cp) {
    this.clientPackages.remove(cp);
  }

  ngOnInit() {
    if(this._auth.af.auth.currentUser.displayName){
      this.router.navigate(['']);
    }
  }

}

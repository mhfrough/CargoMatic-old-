import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";
import { AuthService } from ".././providers/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(public _auth: AuthService) {
    this.items = this._auth.db.list('/registeredAdmin');
  }

  ngOnInit() {
    console.log(this.items);
  }

}

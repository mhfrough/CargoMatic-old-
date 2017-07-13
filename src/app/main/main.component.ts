import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from ".././providers/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase, public _auth: AuthService) {
    this.items = this._auth.db.list('/shipping');
  }

  shipping(origion: string, destination: string, address: string, type: string, size: string,
    total: string, departing: string, reciving: string, pioraty: string, information: string){
    return this.db.database.ref('shipping/' + this._auth.userID).set({
      origion: origion,
      destination: destination,
      address: address,
      type: type,
      size: size,
      total: total,
      departing: departing,
      reciving: reciving,
      pioraty: pioraty,
      information: information
    });
  }

  ngOnInit() {
  }

}

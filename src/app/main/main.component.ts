import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from ".././providers/auth.service";
import { Router } from "@angular/router";
import { TabsetComponent } from "ngx-bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public alert: boolean = false;
    public alertMessage;
    public alertType;
    public ince;

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  items: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase, public _auth: AuthService, public router:Router) {
    this.items = this._auth.db.list('/shipping');
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
public ok;
  shipping(origion: string, destination: string, address: string, type: string, size: string,
    total: string, departing: string, reciving: string, pioraty: string, information: string){

    this.ok = this.db.database.ref('shipping/rank').transaction((increment) => {
      this.ince = increment;
      return increment + 1;
    });
    console.log(this.ok);
    return this.db.database.ref('shipping/package-' + this.ince.toString() + '/').set({
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
    }).then((data) => {
      this.alertType = "success";
      this.alert = true;
      this.alertMessage = "Shipping data submiting done";
    });
  }

  reset(){
    this.alert = false;
  }

  ngOnInit() {
    if(!this._auth.af.auth.currentUser.displayName){
      this.router.navigate(['']);
    }
  }

}

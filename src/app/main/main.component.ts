import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from ".././providers/auth.service";
import { Router } from "@angular/router";
import { TabsetComponent } from "ngx-bootstrap";
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public alert: boolean = false;
    public alertMessage;
    public alertType;
    public tran;
    public ince;
    public price = 0;

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  items: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase, public _auth: AuthService, public router:Router) {
    this.items = this._auth.db.list('shipping/');
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  shipping(origion: string, destination: string, address: string, type: string, size: string,
    total: string, departing: string, reciving: string, pioraty: string, information: string){

    this.tran = this.db.database.ref('shipping/rank').transaction((increment) => {
      this.ince = increment; 
      return increment + 1;
    });
    return this.db.database.ref('shipping/packages-' + this.ince).set({
      uid: this._auth.userID,
      price: this.price,
      origion: origion,
      destination: destination,
      address: address,
      type: type,
      size: size,
      total: total,
      departing: departing,
      reciving: reciving,
      pioraty: pioraty,
      information: information,
      status: 'N'
    }).then((data) => {
      this.alertType = "success";
      this.alert = true;
      this.alertMessage = "Shipping data submiting done";
    }).then((selectTab) => {
      this.staticTabs.tabs[1].active = true;
    });
  }

  reset(){
    this.alert = false;
  }

  onType(type){
    switch(type) {
      case "Harware": {
        this.price = 3;
        break;
      }
      case "Food": {
        this.price = 5;
        break;
      }
      case "Clothing": {
        this.price = 1;
        break;
      }
      default: {
        this.price = 2;
        break;
      }
    }
  }

  onSize(size) {
    switch(size) {
      case "Less then 10KG": {
        this.price += 1;
        break;
      }
      case "In Between 10-25KG": {
        this.price += 5;
        break;
      }
      case "More then 25KG": {
        this.price += 10;
        break;
      }
      default: {
        this.price += 5;
        break;
      }
    } 
  }

  onTotal(total) {
    this.price *= total;
  }
  
  ngOnInit() {
    if(!this._auth.af.auth.currentUser.displayName){
      this.router.navigate(['']);
    }
  }

}

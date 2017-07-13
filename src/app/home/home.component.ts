import { Component, OnInit } from '@angular/core';
import { AuthService } from '.././providers/auth.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _auth: AuthService) { }

  ngOnInit() {
  }

}

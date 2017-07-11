import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public displayName;
  public emailAddress;

  constructor(public af: AngularFireAuth) {
    af.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;      
    });
  }

  get authenticated(): boolean {
    return this.displayName !== null;
  }

  loginWithGoogle(){
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.af.auth.signOut();
  }

}

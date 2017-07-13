import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public displayName;
  public emailAddress;
  public readRegisterUser;
  public getName: any;
  public userID;

  constructor(public af: AngularFireAuth, public db: AngularFireDatabase) {
    af.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
      this.userID = user.uid
      this.readRegisterUser = this.db.database.ref('registeredAdmin/' + user.uid + '/name').on('value', snapshot => {
        this.getName = snapshot.val();
      });
    });
  }

  get authenticated(): boolean {
    return this.displayName !== null;
  }

  loginWithGoogle(){
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithEmail(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  registerAdmin(email: string, password: string) {
    console.log(email,password);
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  saveAdminInfo(uid, name, email) {
    return this.db.database.ref('registeredAdmin/' + uid).set({
      uid: uid,
      name: name,
      email: email
    });
  }
  logout() {
    return this.af.auth.signOut();
  }

}

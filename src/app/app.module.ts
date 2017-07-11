import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { routes } from './app.router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './providers/auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCyRKM45mFgObkteIa-pajuZsMTfUt-LyA",
  authDomain: "long-perception-135823.firebaseapp.com",
  databaseURL: "https://long-perception-135823.firebaseio.com",
  projectId: "long-perception-135823",
  storageBucket: "",
  messagingSenderId: "806321144869"
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireAuth, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

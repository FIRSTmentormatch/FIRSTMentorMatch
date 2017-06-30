import { Component } from '@angular/core';
import { SignUpComponent } from './signup/signup.component'

import { AuthService } from './auth-service/auth.service';
import { Router }   from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: FirebaseListObservable<any>;

  public positions= [];

  constructor(public auth: AuthService, private afd: AngularFireDatabase) {
    this.data = this.afd.list('/users');

    this.positions = this.getMarkers();
  }

  getMarkers() {
    let randomLat: number, randomLng: number;

    let positions = [];

    this.data = this.afd.list('users');

    this.data.subscribe(
      val => console.log(val.location.lat)


    );

    for (let i = 0 ; i < 9; i++) {
      randomLat = Math.random() * (120);
      randomLng = Math.random() * (-120);
      positions.push([randomLat, randomLng]);
    }
    return positions;
  }
}

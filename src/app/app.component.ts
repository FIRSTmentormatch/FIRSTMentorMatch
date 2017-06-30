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
    this.positions = [];
    console.log('called function')
    this.data = this.afd.list('users');

    this.data.subscribe(
      values => {
        console.log('subscribed')
        console.log(values)
        var index;
        for(index in values){
          var value = values[index];
          if (value.lat && value.lng) {
            this.positions.push([value.lat, value.lng]);
          }
          console.log(value)
        }


      }
    );
    return this.positions;
  }
}

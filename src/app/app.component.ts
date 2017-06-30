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

  public users= [];

  constructor(public auth: AuthService, private afd: AngularFireDatabase) {
    this.data = this.afd.list('/users');

    this.users = this.getMarkers();
  }

  getMarkers() {
    this.users = [];
    console.log('called function')
    this.data = this.afd.list('users');

    this.data.subscribe(
      values => {
        console.log('subscribed')
        var index;
        for(index in values){
          var value = values[index];
          var position = [value.lat, value.lng];
          var user = {email:value.email, position:position};
          if (value.lat && value.lng && value.email) {
            this.users.push(user);
          }
          console.log(user)
        }

      }
    );
    return this.users;
  }

  markerClick(event,user) {
    console.log(event);
    console.log(user);
  }
}

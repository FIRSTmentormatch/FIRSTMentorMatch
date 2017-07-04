import { Component, OnInit  } from '@angular/core';
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

export class AppComponent implements OnInit  {
  title = 'app';
  data: FirebaseListObservable<any>;

  public selecteduser = {
    email: "",
    bio: "",
    position: ["",""]
  };

  public showmentor: boolean;


  public users= [];

  map: string;
  accountView;
  mentorView;

  constructor(public auth: AuthService, private afd: AngularFireDatabase) {
    this.data = this.afd.list('/users');
    this.users = this.getMarkers();

    this.map = "100";
    this.accountView = false;
    this.mentorView = false;
  }

  getMarkers() {
    //create an array of users
    this.users = [];

    this.data = this.afd.list('users');

    this.data.subscribe(
      values => {
        //set an index variable to go through the list of objects returned from firebase
        var index;
        //sort through list
        for(index in values){
          //set value to be the indexed firebase object
          var value = values[index];

          var position = [value.lat, value.lng];
          var user = {email:value.email, bio:value.bio, position:position};

          if (value.lat && value.lng && value.email && value.bio) {
            this.users.push(user);
          }
        }

      }
    );
    return this.users;
  }

  markerClick(event,user) {
    console.log(user)
    this.map = "80";
    this.mentorView = true;
    this.selecteduser = user;
  }

  ngOnInit() {
    this.getMarkers();
	}
}

import { Component, OnInit  } from '@angular/core';
import { SignUpComponent } from './signup/signup.component'

import { AuthService } from './auth-service/auth.service';
import { UserService } from './user-service/user.service';

import { FormsModule } from "@angular/forms";

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

  public selecteduser = new UserService();

  public showmentor: boolean;


  public users= [];

  map: string;
  accountView: boolean;
  mentorView: boolean;

  mapcenter: string;
  searchbox: string;
  zoom: number;

  profileStyle: string;


  constructor(public auth: AuthService, private afd: AngularFireDatabase) {
    this.data = this.afd.list('/users');
    this.users = this.getMarkers();

    this.mapcenter = "USA";
    this.searchbox = "";
    this.zoom = 5;

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
          var user = new UserService();
          user.newUser(value);
          if (user.isValid()) {
            this.users.push(user);
          }
        }

      }
    );
    return this.users;
  }

  updateCenter(){
    this.mapcenter = this.searchbox;
    this.zoom = 11;
  }

  markerClick(event,user) {
    console.log("User:");
    console.log(user);
    this.map = "80";
    this.mentorView = true;
    this.accountView = false;
    this.selecteduser = user;

    console.log(this.selecteduser)

    if(this.selecteduser.photoURL){
      this.profileStyle = "url(" + user.photoURL + ") 50% 50% no-repeat";
    }else{
      this.profileStyle = "url(../assets/profile.png) 50% 50% no-repeat";
    }
  }


  showLogin(){
    this.map = "80";
    this.mentorView = false;
    this.accountView = true;
  }

  closeTab(){
    this.map = "100";
    this.mentorView = false;
    this.accountView = false;
    this.mapcenter = "USA";
    this.zoom = 5;
  }

  ngOnInit() {
    this.getMarkers();
	}
}

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth-service/auth.service';
import { UserService } from '../user-service/user.service'
import { Router }   from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {} from '@types/googlemaps';


import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  email;
  password;
  lat: number;
  lng: number;

  imgURL = "../assets/profile.png";
  toggle: boolean;
  imgBool: boolean;
  profileBool: boolean;
  accountBool: boolean;
  loc: string;
  nameEdit: string;
  bioEdit: string;

  flljrBool: boolean;
  fllBool: boolean;
  ftcBool: boolean;
  frcBool: boolean;

  profileStyle: string;

  currentUser = new UserService();

  editedUser = new UserService();


  constructor(public auth: AuthService, private db: AngularFireDatabase, private user: UserService) {
    this.toggle = false;
    this.imgBool = false;
    this.accountBool = true;
    this.loc = "";
    this.nameEdit = "";
    this.bioEdit = "";
    this.flljrBool = false;
    this.fllBool = false;
    this.ftcBool = false;
    this.frcBool = false;

    if(this.auth.isLoggedIn){
      this.db.object('/users/' + this.auth.id).subscribe(user => {
        console.log(user)
        this.currentUser = user;
        if(this.currentUser.photoURL){
          this.profileStyle = "url(" + user.photoURL + ") 50% 50% no-repeat";
        }else{
          this.profileStyle = "url(../assets/profile.png) 50% 50% no-repeat";
        }
        this.flljrBool = user.areas.flljr;
        this.fllBool = user.areas.fll;
        this.ftcBool = user.areas.ftc;
        this.frcBool = user.areas.frc;
        this.bioEdit = user.bio;
        this.nameEdit = user.name;
        this.loc = user.address;
      });

      this.editedUser = this.currentUser;
    }
  }


  login(email: string, password: string) {
    this.auth.login(email, password);
    this.update();
  }

	signUp(email: string, password: string) {
		this.auth.signUp(email, password);
    this.update();
	}

  geocode(address){
    return new Promise(function(resolve,reject){
      var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            this.lat = 0;
          }
        });
      });
  }

  submit(){
    console.log(this.lat)
    this.geocode(this.loc).then(results => {
      this.db.object('users/' + this.auth.id).update({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      });
    });
    this.db.object('users/' + this.auth.id).update({
      address: this.loc,
      bio: this.bioEdit,
      name: this.nameEdit,
      areas : {
        fll: this.fllBool,
        flljr: this.flljrBool,
        ftc: this.ftcBool,
        frc: this.frcBool
      }
    });

    this.update();
    this.toggleProfileEdit();
  }

  upload(file: File){
    firebase.storage().ref('/users/' + this.auth.id + '/' + 'Profile Picture')
      .put(file).then(snapshot => {
        this.db.object('users/' + this.auth.id).update({
          photoURL: snapshot.downloadURL
        });
      });
      this.update();
    this.accountBool = true;
    this.imgBool = !this.imgBool;
  }

  toggleflip(){
    this.toggle = !this.toggle;
  }

  toggleImgEdit(){
    this.imgBool = !this.imgBool;
    this.accountBool = !this.accountBool;
  }

  toggleProfileEdit(){
    this.profileBool = !this.profileBool;
    this.accountBool = !this.accountBool;
  }

  update(){
    this.db.object('/users/' + this.auth.id).subscribe(user => {
      this.flljrBool = user.areas.flljr;
      this.fllBool = user.areas.fll;
      this.ftcBool = user.areas.ftc;
      this.frcBool = user.areas.frc;
      this.bioEdit = user.bio;
      this.nameEdit = user.name;
      this.loc = user.address;
    });
  }


  logout() {
    this.auth.logout();
  }

	ngOnInit() {
	}

}

import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth-service/auth.service';
import { Router }   from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  email;
  password;
  lat;
  lng;

  imgURL = "../assets/profile.png";

  toggle: boolean;

  imgBool: boolean;



  constructor(public auth: AuthService, private db: AngularFireDatabase) {
    this.toggle = false;
    this.imgBool = false;
    this.db.object('/users/' + this.auth.id).subscribe(user => {
      this.imgURL = user.PhotoURL;
    });
  }

  login(email: string, password: string) {
    this.auth.login(email, password);
  }

	signUp(email: string, password: string) {
		this.auth.signUp(email, password);

		email = '';
		password = '';
	}

  upload(file: File){
    firebase.storage().ref('/users/' + this.auth.id + '/' + 'Profile Picture')
      .put(file).then(snapshot => {
        this.db.object('users/' + this.auth.id).set({
          PhotoURL: snapshot.downloadURL
        });
      });
  }

  toggleflip(){
    this.toggle = !this.toggle;
  }

  toggleImgEdit(){
    this.imgBool = !this.imgBool;
  }


  logout() {
    this.auth.logout();
  }

	ngOnInit() {
	}

}

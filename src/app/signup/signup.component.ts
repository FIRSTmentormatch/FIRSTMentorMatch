import { Component, OnInit } from '@angular/core';


import { AuthService } from '../auth-service/auth.service';
import { Router }   from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

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

  toggle;

  constructor(public auth: AuthService, private afd: AngularFireDatabase) {
    this.toggle = false;
  }

  login(email: string, password: string) {
    this.auth.login(email, password);
  }

	signUp(email: string, password: string, lat: string, lng: string) {
		this.auth.signUp(email, password, lat, lng);

		email = '';
		password = '';
	}

  toggleflip(){
    this.toggle = !this.toggle;
  }


  logout() {
    this.auth.logout();
  }

	ngOnInit() {
	}

}

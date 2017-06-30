import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

export interface coords {
	lat: number;
	lng: number;
}

@Injectable()
export class AuthService {

	public isLoggedIn: boolean;

	public id: string;

	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
		this.afAuth.authState.subscribe((auth) => {
			if(auth) {
				this.isLoggedIn = true;
			} else {
				this.isLoggedIn = false;
			}
			console.log(this.isLoggedIn);
		});
	}

	public login(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}


	public signUp(email: string, password: string, latIn: string, lngIn: string) {

		this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				this.db.object('users/' + user.uid).set({
					email: email
				});
				this.id = user.id;
				this.addcoords(user.uid, latIn, lngIn);
			});


	}

	public addcoords(uid: string, lat: string, lng: string){
		this.db.object('users/' + uid + "/location/").set(
			{
				"lat": lat,
				"lng": lng
		});
	}


	public logout() {
		this.afAuth.auth.signOut();
	}
}

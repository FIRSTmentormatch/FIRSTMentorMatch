import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

	public isLoggedIn: boolean;

	public id: string;

	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
		this.afAuth.authState.subscribe((auth) => {
			if(auth) {
				this.isLoggedIn = true;
				this.id = auth.uid;
			} else {
				this.isLoggedIn = false;
				this.id = "";
			}
			console.log(this.isLoggedIn);
		});
	}

	public login(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}


	public signUp(email: string, password: string) {
		this.afAuth.auth.createUserWithEmailAndPassword(email, password);
	}

	public logout() {
		this.afAuth.auth.signOut();
	}



}

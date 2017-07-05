import { Injectable } from '@angular/core';

export interface User {
  $key: string;
  email: string;
  bio: string;
  photoURL: string;
  lat: number;
  lng: number;
}

@Injectable()
export class UserService {

  private email: string;
  private id: string;
  private bio: string;
  private location: google.maps.LatLngLiteral;

  constructor() { 
    this.email = "";
    this.id = "";
    this.bio = "";
    this.location = {lat: 0.0, lng: 0.0};
  }

  public newUser(user:User) {
	this.bio = user.bio; 
	this.email = user.email;
	this.id = user.$key;
	this.location = {lat: Number(user.lat), lng: Number(user.lng)};
  }

  public isValid() {
  	return true;
  }

  public getLocation() {
  	return this.location; 	
  }

}

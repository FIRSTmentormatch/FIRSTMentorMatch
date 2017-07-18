import { Injectable } from '@angular/core';

export interface User {
  $key: string;
  name: string;
  email: string;
  bio: string;
  photoURL: string;
  lat: number;
  lng: number;
  areas: {
    flljr: boolean,
    fll: boolean,
    ftc: boolean,
    frc: boolean
  }
}

@Injectable()
export class UserService {

  private name: string;
  private email: string;
  private id: string;
  private bio: string;
  public photoURL: string;
  private location: google.maps.LatLngLiteral;
  private areas: Object;


  constructor() {
    this.name = "";
    this.email = "";
    this.id = "";
    this.bio = "";
    this.photoURL = "";
    this.location = {lat: 0.0, lng: 0.0};
    this.areas = {
      flljr: false,
      fll: false,
      ftc: false,
      frc: false
    }
  }

  public newUser(user:User) {
      this.name = user.name;
	    this.bio = user.bio;
	    this.email = user.email;
      this.photoURL = user.photoURL;
	    this.id = user.$key;
	    this.location = {lat: Number(user.lat), lng: Number(user.lng)};
      if(user.areas){
        this.areas = user.areas;
      }else{
        this.areas = {
          flljr: false,
          fll: false,
          ftc: false,
          frc: false
        }
      }
  }

  public isValid() {
  	return true;
  }

  public getLocation() {
    if (this.location.lat != 0 && this.location.lng != 0){
  	   return this.location;
    }
  }

  public getImage() {
    console.log(this.photoURL)
    if(this.photoURL){
      return {
        url: this.photoURL + '',

        size: new google.maps.Size(32, 32),

        scaledSize: new google.maps.Size(32,32),

        origin: new google.maps.Point(0, 0),

        anchor: new google.maps.Point(0, 0)
      }
    }else{
        return {
          url: '../assets/profile.png',

          size: new google.maps.Size(32, 32),

          scaledSize: new google.maps.Size(32,32),

          origin: new google.maps.Point(0, 0),

          anchor: new google.maps.Point(0, 0)
        }
    }
  }

}

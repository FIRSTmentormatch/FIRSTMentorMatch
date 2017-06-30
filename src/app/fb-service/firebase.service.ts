import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  coords: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) { }

}

interface Coords{
  lat: number;
  lng: number;
}

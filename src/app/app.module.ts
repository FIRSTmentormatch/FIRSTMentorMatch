import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NguiMapModule} from '@ngui/map';

import { AppComponent } from './app.component';
import { SignUpComponent} from './signup/signup.component'
import { AuthService } from './auth-service/auth.service';
import { UserService } from './user-service/user.service'

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBHTzUv5LSFMiAnk16KBJxHvjwknwBeHiw'})
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

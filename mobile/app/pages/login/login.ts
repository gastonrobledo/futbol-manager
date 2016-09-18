import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthService]
})
export class LoginPage {
  email: string;
  password: string;
  constructor(public nav: NavController, public platform: Platform, public authApi: AuthService) {
  }

  login() {
    this.authApi.auth(this.email, this.password).subscribe(
      data => {
        console.log(data);
        //Navigate to home page
        this.nav.setRoot(HomePage);
      }
    )
  }
}

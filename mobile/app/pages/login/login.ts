import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';


@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthService]
})
export class LoginPage {
  username: string;
  password: string;
  constructor(public nav: NavController, public platform: Platform, public authApi: AuthService) {
  }

  login() {
    this.authApi.auth(this.username, this.password).subscribe(
      data => {
        console.log(data);
        //Navigate to home page
        this.nav.setRoot(TabsPage);
      }
    )
  }
}

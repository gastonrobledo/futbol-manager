import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { LoginPage } from './pages/login/login';
import { AuthService } from './services/auth.service';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [AuthService]
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform, public authApi: AuthService) {
    this.rootPage = authApi.isLogged() ? TabsPage : LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);

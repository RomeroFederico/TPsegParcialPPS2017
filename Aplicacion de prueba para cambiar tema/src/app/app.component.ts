import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PruebaTemaPage } from '../pages/prueba-tema/prueba-tema';
import { AppState } from './app.global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PruebaTemaPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public global : AppState) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

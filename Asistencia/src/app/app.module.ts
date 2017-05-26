import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { HomeAlumnoPage } from '../pages/home-alumno/home-alumno';
import { HomeProfesorPage } from '../pages/home-profesor/home-profesor';
import { HomeAdministradorPage } from '../pages/home-administrador/home-administrador';
import { HomeAdministrativoPage } from '../pages/home-administrativo/home-administrativo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage,
    HomeAlumnoPage,
    HomeProfesorPage,
    HomeAdministrativoPage,
    HomeAdministradorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    HomeAlumnoPage,
    HomeProfesorPage,
    HomeAdministrativoPage,
    HomeAdministradorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

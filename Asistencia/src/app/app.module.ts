import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { HomeAlumnoPage } from '../pages/home-alumno/home-alumno';

import { HomeAdministradorPage } from '../pages/home-administrador/home-administrador';
import { HomeAdministrativoPage } from '../pages/home-administrativo/home-administrativo';
import { ListadoAdministradorPage } from '../pages/listado-administrador/listado-administrador';
import { AgregarAdministradorPage } from '../pages/agregar-administrador/agregar-administrador';

//Profesor
import { HomeProfesorPage } from '../pages/home-profesor/home-profesor';
import { DatosProfesorPage } from '../pages/datos-profesor/datos-profesor';

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
    HomeAdministradorPage,
    ListadoAdministradorPage,
    AgregarAdministradorPage,
    DatosProfesorPage,
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
    HomeAdministradorPage,
    ListadoAdministradorPage,
    AgregarAdministradorPage,
    DatosProfesorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

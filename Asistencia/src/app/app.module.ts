import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { HomeAlumnoPage } from '../pages/home-alumno/home-alumno';

import { HomeAdministrativoPage } from '../pages/home-administrativo/home-administrativo';

import { HomeAdministradorPage } from '../pages/home-administrador/home-administrador';
import { ListadoAdministradorPage } from '../pages/listado-administrador/listado-administrador';
import { AgregarAdministradorPage } from '../pages/agregar-administrador/agregar-administrador';
import { DatosAdministradorPage } from '../pages/datos-administrador/datos-administrador';

//Profesor
import { HomeProfesorPage } from '../pages/home-profesor/home-profesor';
import { DatosProfesorPage } from '../pages/datos-profesor/datos-profesor';
import { ListadoClasesProfesorPage } from '../pages/listado-clases-profesor/listado-clases-profesor';
import { ListadoDivisionesProfesorPage } from '../pages/listado-divisiones-profesor/listado-divisiones-profesor';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';



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
    DatosAdministradorPage,
    DatosProfesorPage,
    ListadoClasesProfesorPage,
    ListadoDivisionesProfesorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    DatosAdministradorPage,
    DatosProfesorPage,
    ListadoClasesProfesorPage,
    ListadoDivisionesProfesorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

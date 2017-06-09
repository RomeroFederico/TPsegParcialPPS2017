import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';

//Alumno
import { HomeAlumnoPage } from '../pages/home-alumno/home-alumno';
import { DatosAlumnoPage } from '../pages/datos-alumno/datos-alumno';
import { NotificacionesAlumnoPage } from '../pages/notificaciones-alumno/notificaciones-alumno';
import { ListadoDivisionesAlumnoPage } from '../pages/listado-divisiones-alumno/listado-divisiones-alumno';
import { DatosDivisionAlumnoPage } from '../pages/datos-division-alumno/datos-division-alumno';
import { AsistenciaAlumnoPage } from '../pages/asistencia-alumno/asistencia-alumno';


import { HomeAdministrativoPage } from '../pages/home-administrativo/home-administrativo';

import { HomeAdministradorPage } from '../pages/home-administrador/home-administrador';
import { ListadoAdministradorPage } from '../pages/listado-administrador/listado-administrador';
import { AgregarAdministradorPage } from '../pages/agregar-administrador/agregar-administrador';
import { DatosAdministradorPage } from '../pages/datos-administrador/datos-administrador';
import { ModalAdministradorPage} from '../pages/modal-administrador/modal-administrador';

//Profesor
import { HomeProfesorPage } from '../pages/home-profesor/home-profesor';
import { DatosProfesorPage } from '../pages/datos-profesor/datos-profesor';
import { ListadoClasesProfesorPage } from '../pages/listado-clases-profesor/listado-clases-profesor';
import { ListadoDivisionesProfesorPage } from '../pages/listado-divisiones-profesor/listado-divisiones-profesor';
import { DatosDivisionProfesorPage } from '../pages/datos-division-profesor/datos-division-profesor';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage,
    HomeProfesorPage,
    HomeAdministrativoPage,
    HomeAdministradorPage,
    ListadoAdministradorPage,
    AgregarAdministradorPage,
    DatosAdministradorPage,
    ModalAdministradorPage,
    DatosProfesorPage,
    ListadoClasesProfesorPage,
    ListadoDivisionesProfesorPage,
    DatosDivisionProfesorPage,
    HomeAlumnoPage,
    DatosAlumnoPage,
    NotificacionesAlumnoPage,
    ListadoDivisionesAlumnoPage,
    DatosDivisionAlumnoPage,
    AsistenciaAlumnoPage

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
    ModalAdministradorPage,
    DatosProfesorPage,
    ListadoClasesProfesorPage,
    ListadoDivisionesProfesorPage,
    DatosDivisionProfesorPage,
    DatosAlumnoPage,
    NotificacionesAlumnoPage,
    ListadoDivisionesAlumnoPage,
    DatosDivisionAlumnoPage,
    AsistenciaAlumnoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

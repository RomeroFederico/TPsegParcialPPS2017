import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';

//Alumno
import { HomeAlumnoPage } from '../pages/home-alumno/home-alumno';
import { DatosAlumnoPage } from '../pages/datos-alumno/datos-alumno';
import { NotificacionesAlumnoPage } from '../pages/notificaciones-alumno/notificaciones-alumno';
import { ListadoDivisionesAlumnoPage } from '../pages/listado-divisiones-alumno/listado-divisiones-alumno';
import { DatosDivisionAlumnoPage } from '../pages/datos-division-alumno/datos-division-alumno';
import { AsistenciaAlumnoPage } from '../pages/asistencia-alumno/asistencia-alumno';

//Administrativo
import { HomeAdministrativoPage } from '../pages/home-administrativo/home-administrativo';
import { ListadoAdministrativoPage } from '../pages/listado-administrativo/listado-administrativo';
import { AsistenciaAdministrativoPage } from '../pages/asistencia-administrativo/asistencia-administrativo';
import { DatosAdministrativoPage } from '../pages/datos-administrativo/datos-administrativo';

//Administrador
import { HomeAdministradorPage } from '../pages/home-administrador/home-administrador';
import { ListadoAdministradorPage } from '../pages/listado-administrador/listado-administrador';
import { AgregarAdministradorPage } from '../pages/agregar-administrador/agregar-administrador';
import { DatosAdministradorPage } from '../pages/datos-administrador/datos-administrador';
import { ModalAdministradorPage} from '../pages/modal-administrador/modal-administrador';

//Profesor
import { HomeProfesorPage } from '../pages/home-profesor/home-profesor';
import { DatosProfesorPage } from '../pages/datos-profesor/datos-profesor';
import { ListadoClasesProfesorPage } from '../pages/listado-clases-profesor/listado-clases-profesor';
import { ListadoMateriasProfesorPage } from '../pages/listado-materias-profesor/listado-materias-profesor';
import { ListadoDivisionesProfesorPage } from '../pages/listado-divisiones-profesor/listado-divisiones-profesor';
import { DatosDivisionProfesorPage } from '../pages/datos-division-profesor/datos-division-profesor';
import { NotificacionesProfesorPage } from '../pages/notificaciones-profesor/notificaciones-profesor';
import { Mapa } from '../pages/mapa/mapa';
import { Ayuda } from '../pages/ayuda/ayuda';
import { Encuesta } from '../pages/encuesta/encuesta';
import { Graficos } from '../pages/graficos/graficos';
import { ChartsModule } from 'ng2-charts';//AGREGO CHARTS
//JWT
import { JwtModule } from './jwt/jwt.module';
import { AuthHttp, provideAuth } from 'angular2-jwt';
import { Auth } from '../providers/auth';
import { VerificarJwt } from '../providers/verificar-jwt';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


//OTROS
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

//TEMAS
import { AppState } from './app.global';
import { MenuTemaPage } from "../pages/menu-tema/menu-tema";
import { ModalTemaPage } from "../pages/modal-tema/modal-tema";
import { PersonalizarPage } from "../pages/personalizar/personalizar";

var configFirebase  = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAHaZ6UCqpBi9HPJv_d5VA-V8p7npCIybE",
    authDomain: "asistencia-324ef.firebaseapp.com",
    databaseURL: "https://asistencia-324ef.firebaseio.com",
    projectId: "asistencia-324ef",
    storageBucket: "asistencia-324ef.appspot.com",
    messagingSenderId: "539446481174"
  
  }
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    Mapa,
    Ayuda,
    Encuesta,
    Graficos,
    MenuPage,
    HomeProfesorPage,
    HomeAdministrativoPage,
    ListadoAdministrativoPage,
    AsistenciaAdministrativoPage,
    DatosAdministrativoPage,
    HomeAdministradorPage,
    ListadoAdministradorPage,
    AgregarAdministradorPage,
    DatosAdministradorPage,
    ModalAdministradorPage,
    DatosProfesorPage,
    ListadoClasesProfesorPage,
    ListadoDivisionesProfesorPage,
    ListadoMateriasProfesorPage,
    DatosDivisionProfesorPage,
    NotificacionesProfesorPage,
    HomeAlumnoPage,
    DatosAlumnoPage,
    NotificacionesAlumnoPage,
    ListadoDivisionesAlumnoPage,
    DatosDivisionAlumnoPage,
    AsistenciaAlumnoPage,
    MenuTemaPage,
    ModalTemaPage,
    PersonalizarPage
  ],
  imports: [
    BrowserModule,
    JwtModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configFirebase.firebase),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    HomeAlumnoPage,
    Mapa,
    Ayuda,
    Encuesta,
    Graficos,
    HomeProfesorPage,
    HomeAdministrativoPage,
    AsistenciaAdministrativoPage,
    ListadoAdministrativoPage,
    DatosAdministrativoPage,
    HomeAdministradorPage,
    ListadoAdministradorPage,
    AgregarAdministradorPage,
    DatosAdministradorPage,
    ModalAdministradorPage,
    DatosProfesorPage,
    ListadoClasesProfesorPage,
    ListadoDivisionesProfesorPage,
    ListadoMateriasProfesorPage,
    DatosDivisionProfesorPage,
    NotificacionesProfesorPage,
    DatosAlumnoPage,
    NotificacionesAlumnoPage,
    ListadoDivisionesAlumnoPage,
    DatosDivisionAlumnoPage,
    AsistenciaAlumnoPage,
    MenuTemaPage,
    ModalTemaPage,
    PersonalizarPage
  ],
  providers: [
    AppState,
    Auth,VerificarJwt,AuthHttp,AuthHttp,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        }),
    AngularFireAuth,
    AngularFireDatabase,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

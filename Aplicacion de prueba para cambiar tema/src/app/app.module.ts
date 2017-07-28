import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { PruebaTemaPage } from '../pages/prueba-tema/prueba-tema';
import { MenuTemaPage } from '../pages/menu-tema/menu-tema';
import { PersonalizarPage } from '../pages/personalizar/personalizar';
import { ModalTemaPage } from '../pages/modal-tema/modal-tema';

import { JwtModule } from './jwt/jwt.module';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

//OTROS
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { AppState } from './app.global';

@NgModule({
  declarations: [
    MyApp,
    PruebaTemaPage,
    PersonalizarPage,
    MenuTemaPage,
    ModalTemaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PruebaTemaPage,
    MenuTemaPage,
    PersonalizarPage,
    ModalTemaPage
  ],
  providers: [
    AppState,
    AuthHttp,
    AuthHttp,
    provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'bearer',
            tokenName: 'token',
            tokenGetter: (() => localStorage.getItem('token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
    }),
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

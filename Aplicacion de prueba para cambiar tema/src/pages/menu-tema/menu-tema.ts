import { Component } from '@angular/core';
import { AlertController, NavController, ViewController, NavParams, LoadingController,ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppState } from '../../app/app.global';

@Component({
  selector: 'menu-tema',
  templateUrl: 'menu-tema.html'
})
export class MenuTemaPage {

  mostrarTemaPersonalizado = null;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public alert: AlertController,
              public global: AppState,
              public events : Events,
              private storage: Storage) 
  {
    this.storage.get("Tema").then(datos => {
      this.mostrarTemaPersonalizado = true;
    })
    .catch(err=>
    {
      this.mostrarTemaPersonalizado = null;
    });
  }

  CambiarTema(tema) {
    this.global.set('theme', tema);
    this.events.publish('QuitarTemaPersonalizado');
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  CambiarTemaPersonalizado()
  {
    this.global.set('theme', "");
    this.events.publish('TemaSeteado');
    this.close();
  }

}

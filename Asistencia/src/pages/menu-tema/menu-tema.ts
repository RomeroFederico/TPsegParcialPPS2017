import { Component } from '@angular/core';
import { AlertController, NavController, ViewController, NavParams, LoadingController,ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppState } from '../../app/app.global';

import { Ws } from '../../providers/ws';

@Component({
  selector: 'menu-tema',
  templateUrl: 'menu-tema.html',
  providers : [Ws]
})
export class MenuTemaPage {

  mostrarTemaPersonalizado = null;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public alert: AlertController,
              public global: AppState,
              public events : Events,
              private storage: Storage,
              public ws : Ws) 
  {
    this.storage.get("Tema").then(datos => {
      if (datos.temaPersonalizado != undefined)
        this.mostrarTemaPersonalizado = true;
    })  
    .catch(err=>
    {
      this.mostrarTemaPersonalizado = null;
    });
  }

  CambiarTema(tema) {

    // this.global.set('theme', tema);
    // this.events.publish('QuitarTemaPersonalizado');
    // this.close();
    this.GuardarTemaBD(tema);
  }

  GuardarTemaBD(tema)
  {
    var usuario = JSON.parse(localStorage.getItem("usuario"));

    this.ws.GuardarTema({idUsuario : usuario.idUsuario, tema : tema}).then((data) => {
      console.log(data);
    })
    .catch((error) => { console.log("Error"); });

    this.global.set('theme', tema);
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  CambiarTemaPersonalizado()
  {
    //this.global.set('theme', "");
    //this.events.publish('TemaSeteado');
    this.close();
  }

}

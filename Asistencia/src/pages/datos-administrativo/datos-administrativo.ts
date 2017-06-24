import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { Storage } from '@ionic/storage';

import { Usuario } from '../../components/clases/usuario';
//import { Administrador } from '../../components/clases/administrador';
import { Administrativo } from '../../components/clases/administrativo';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';
import { Ciclo } from '../../components/clases/ciclo';

@Component({
  selector: 'page-datos-administrativo',
  templateUrl: 'datos-administrativo.html'
})
export class DatosAdministrativoPage {

  usuario : Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage)
  {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(this.usuario);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosAdministradorPage');
  }
  /**
  * Volver a la pagina anterior.
  */
  Volver()
  {
    this.navCtrl.pop();
  }

  NoImplementado()
  {
    let confirm = this.alertCtrl.create({
      title: 'Informacion',
      message: 'No implementado aun...',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  /**
  * Devuelve el tipo de usuario en formato de cadena.
  * @param usuario usuario del sistema.
  */
  DevolverTipo(usuario)
  {
    if (usuario instanceof Administrativo)
      return "Administrativo";
    else if (usuario instanceof Profesor)
      return "Profesor";
    else
      return "Alumno";
  }

}

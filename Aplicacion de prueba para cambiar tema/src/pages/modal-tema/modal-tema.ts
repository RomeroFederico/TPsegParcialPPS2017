import { Component } from '@angular/core';
import { AlertController, NavController, ViewController, NavParams, LoadingController,ToastController } from 'ionic-angular';

import { AppState } from '../../app/app.global';

@Component({
  selector: 'modal-tema',
  templateUrl: 'modal-tema.html'
})
export class ModalTemaPage {

  coloresPrincipales : Array<any> = null;
  coloresSecundarios : Array<any> = null;
  coloresFondo : Array<any> = null;

  fuentes : Array<any> = null;
  sizes : Array<any> = null;
  coloresFuente : Array<any> = null;

  opcion : number = null;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public alert: AlertController,
              public global: AppState,
              params: NavParams) 
  {
    this.opcion = params.get("opcion");

    this.coloresPrincipales = [{nombre : 'Negro', codigo : '#222'},
                               {nombre : 'Azul', codigo : '#327eff'},
                               {nombre : 'Verde', codigo : '#32db64'},
                               {nombre : 'Rojo', codigo : '#f53d3d'},
                               {nombre : 'Violeta', codigo : '#9E40A4'},
                               {nombre : 'Naranja', codigo : '#E36E1B'}];

    this.coloresSecundarios = [{nombre : 'Gris', codigo : '#616161'},
                               {nombre : 'Celeste', codigo : '#5694FF'},
                               {nombre : 'Verde Claro', codigo : '#52DF7C'},
                               {nombre : 'Rojo Claro', codigo : '#F25555'},
                               {nombre : 'Violeta Claro', codigo : '#B662BC'},
                               {nombre : 'Naranja Claro', codigo : '#E98C4A'}];

    this.coloresFondo = [{nombre : 'Gris Claro', codigo : 'lightgray'},
                               {nombre : 'Celeste Claro', codigo : 'lightblue'},
                               {nombre : 'Verde Oliva', codigo : '#BCFFBC'},
                               {nombre : 'Rosa', codigo : 'lightcoral'},
                               {nombre : 'Lila', codigo : '#AD8DB0'},
                               {nombre : 'Amarillo', codigo : '#F6D875'}];

    this.fuentes = [{ nombre :  'Gill Sans', todo : 'Gill Sans, Trebuchet MS, sans-serif' },
                    { nombre :  'Arial', todo : 'Arial, Trebuchet MS, sans-serif' },
                    { nombre :  'Calibri', todo : 'Calibri, Trebuchet MS, sans-serif' },
                    { nombre :  'Times New Roman', todo : 'Times New Roman, Trebuchet MS, sans-serif' },
                    { nombre :  'Franklin Gothic Medium', todo : 'Franklin Gothic Medium, Trebuchet MS, sans-serif' },
                    { nombre :  'Trebuchet MS', todo : 'Trebuchet MS, sans-serif' }];

    this.sizes = [{ nombre :  'Grande', todo : 'large' },
                  { nombre :  'Mediana', todo : 'medium' },
                  { nombre :  'Pequeña', todo : 'small' }];

    this.coloresFuente = [{ nombre :  'Negro', todo : 'black' },
                          { nombre :  'Blanco', todo : 'white' }];
  }

  ElegirColor(color) {
    this.viewCtrl.dismiss({exito : true, color : color});
  }

  ElegirFuente(fuente) {
    this.viewCtrl.dismiss({exito : true, fuente : fuente});
  }

  ElegirSize(size) {
    this.viewCtrl.dismiss({exito : true, size : size});
  }

  ElegirColorFuente(color) {
    this.viewCtrl.dismiss({exito : true, colorFuente : color});
  }

  ElegirCursiva(resultado) {
    this.viewCtrl.dismiss({exito : true, cursiva : resultado});
  }

  close() {
    this.viewCtrl.dismiss({exito : false});
  }

}

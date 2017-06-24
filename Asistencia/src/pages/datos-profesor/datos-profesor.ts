import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Profesor } from '../../components/clases/profesor';


@Component({
  selector: 'page-datos-profesor',
  templateUrl: 'datos-profesor.html',
})
export class DatosProfesorPage {

  profesor:Profesor = new Profesor();
  fecha:Date = new Date();
  hoy:String = this.fecha.toDateString();
  fotoProfesor = "assets/images/profesor/profesor.png";
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage)
  {
    this.profesor = this.navParams.get("Profesor");
    this.fotoProfesor = "assets/images/profesor/" + this.profesor.img;
    console.log(this.profesor);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosProfesor');
  }
  Volver()
  {
    this.navCtrl.pop();
  }

}

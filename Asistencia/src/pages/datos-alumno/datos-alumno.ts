import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Alumno } from '../../components/clases/alumno';


@Component({
  selector: 'page-datos-alumno',
  templateUrl: 'datos-alumno.html',
})
export class DatosAlumnoPage {

  alumno:Alumno = new Alumno();
  fecha:Date = new Date();
  hoy:String = this.fecha.toDateString();

  constructor(public navCtrl: NavController,
              public navParams: NavParams)
  {
        console.log(this.navParams.get("Alumno"));
        this.alumno = this.navParams.get("Alumno");
        console.log(this.fecha.toDateString());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosAlumno');
  }
  Volver()
  {
    this.navCtrl.pop();
  }





}

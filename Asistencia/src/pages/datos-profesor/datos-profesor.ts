import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Profesor } from '../../components/clases/profesor';


@Component({
  selector: 'page-datos-profesor',
  templateUrl: 'datos-profesor.html',
})
export class DatosProfesorPage {

  profesor:Profesor = new Profesor();
  fecha:Date = new Date();
  hoy:String = this.fecha.toDateString(); 
  
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    console.log(this.navParams.get("Profesor"));
    this.profesor = this.navParams.get("Profesor");
    console.log(this.fecha.toDateString());
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosProfesor');
  }
  Volver()
  {
    this.navCtrl.pop();
  }

}

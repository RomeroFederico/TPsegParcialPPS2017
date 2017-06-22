import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Profesor } from '../../components/clases/profesor';


@Component({
  selector: 'page-datos-profesor',
  templateUrl: 'datos-profesor.html',
})
export class DatosProfesorPage {

  //profesor:Profesor = new Profesor(1,"Octavio","Villegas","99333222","100200","octavio@gmail.com","123",30,"profesor.png","Masculino");
  profesor:Profesor = new Profesor();
  fecha:Date = new Date();
  hoy:String = this.fecha.toDateString(); 
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) 
  {
    
    this.profesor=JSON.parse(localStorage.getItem("usuario"));
    console.log(this.profesor);
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

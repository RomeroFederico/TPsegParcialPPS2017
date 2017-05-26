import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home-alumno',
  templateUrl: 'home-alumno.html'
})
export class HomeAlumnoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAlumnoPage');
  }

}

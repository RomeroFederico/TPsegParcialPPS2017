import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-listado-divisiones-profesor',
  templateUrl: 'listado-divisiones-profesor.html',
})
export class ListadoDivisionesProfesorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoDivisionesProfesor');
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home-profesor',
  templateUrl: 'home-profesor.html'
})
export class HomeProfesorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeProfesorPage');
  }

}

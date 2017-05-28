import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-listado-clases-profesor',
  templateUrl: 'listado-clases-profesor.html',
})
export class ListadoClasesProfesorPage 
{

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {

  }
  Volver()
  {
    this.navCtrl.pop();
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';

import { Ws } from '../../providers/ws';
import { Device } from '@ionic-native/device';

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
  providers:[Ws,Device,LocalNotifications]
})
export class Graficos {
  usuarios:any;
  public pieChartLabels:string[] = ['Alumno', 'Profesor', 'Secretario',"Administrador"];
  public pieChartData:number[] = [600, 200, 100,100];
  public pieChartType:string = 'pie';

  constructor(private localNotifications: LocalNotifications,public navCtrl: NavController, public navParams: NavParams,private ws :Ws,private device: Device, public alert: AlertController) 
  {
    this.ws.TraerUsuarios()
    .then(data => {console.log(data);this.usuarios = data;})
    .catch(error => {console.log(error);});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Graficos');
  }
  Volver()
  {
    this.navCtrl.pop();
  }


  Info()
  {
      let alert = this.alert.create({
      message: this.device.platform + ' - ' +this.device.model+ ' - ' +this.device.version ,
      buttons: ['OK']
    });
    alert.present();
  }
  Mostrar(obj)
  {
    let alert = this.alert.create({
      message: obj,
      buttons: ['OK']
    });
    alert.present();
  }
  Noti()
  {
this.localNotifications.schedule({
   text: 'Metal Knight!',
   at: new Date(new Date().getTime() + 3600),
   led: 'FF0000',
   sound: null
});
  }

  public chartClicked(e:any):void {console.log(e);} //SOLO MUESTRA EVENTO!
 
  public chartHovered(e:any):void {console.log(e);}//SOLO MUESTRA EVENTO!
}

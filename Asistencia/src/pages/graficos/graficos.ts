import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,LoadingController} from 'ionic-angular';

import { Ws } from '../../providers/ws';
import { Device } from '@ionic-native/device';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
  providers:[Ws,Device,LocalNotifications,File]
})
export class Graficos {
  usuarios:any;
  cantClientes:number=0;
  cantEmpleados:number=0;
  cantEncargados:number=0;
  cantAdministrador:number=0;
  loading:any;

  constructor(private localNotifications: LocalNotifications,
  public navCtrl: NavController,public loading2:LoadingController, 
  public navParams: NavParams,private file :File,
  private ws :Ws,private device: Device, 
  public alert: AlertController) 
  {
    this.MostrarLoading();
    this.ws.TraerUsuarios()
    .then(data => 
    {
      this.loading.dismiss();
      console.log(data);
      this.usuarios = data;
      for (let usu of data) 
      {
        if(usu.tipo=="Alumno")
        {
          this.cantClientes=this.cantClientes+1;
        }
              if(usu.tipo=="Profesor")
        {
          this.cantEmpleados=this.cantEmpleados+1;
        }
              if(usu.tipo=="Administrativo")
        {
          this.cantEncargados=this.cantEncargados+1;
        }
              if(usu.tipo=="Administrador")
        {
          this.cantAdministrador=this.cantAdministrador+1;
        }
      console.log(this.cantAdministrador);
      this.pieChartData = [this.cantClientes, this.cantEmpleados, this.cantEncargados,this.cantAdministrador];
      }
    })
    .catch(error => 
    {
      console.log(error);
      this.loading.dismiss();
      this.Mostrar("Error intentelo mas tarde!");
      this.Volver();
    });
  }
  public pieChartLabels:string[] = ['Alumno', 'Profesor', 'Secretario',"Administrador"];
  public pieChartData:number[] = [this.cantClientes, this.cantEmpleados, this.cantEncargados,this.cantAdministrador];
  public pieChartType:string = 'pie';

  ionViewDidLoad() {
    console.log('ionViewDidLoad Graficos');
  }
  Volver()
  {
    this.navCtrl.pop();
  }
    MostrarLoading() 
  {
    let loading = this.loading2.create({
      spinner: 'bubbles',
      content: `Cargando, 
      Espere un Momento...`,
    });

    this.loading = loading;

    this.loading.present();
  }

  Info()
  {
      let alert = this.alert.create({
      title: this.device.platform + ' \n ' +this.device.model+ ' \n ' +this.device.version ,
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
  GuardarTxtJson()
  {
    var datos = JSON.stringify(this.usuarios);
    this.file.writeFile(this.file.externalApplicationStorageDirectory,"Usuarios.txt",datos,true)
    .then(data => 
    { 
      this.Mostrar("Se guardo archivo correctamente!\n En: "+this.file.externalApplicationStorageDirectory);
      console.log(data);
    })
    .catch(e => 
    { 
      this.Mostrar("Error al guardar archivo!");
      console.log(e);
    });
    
  }
    GuardarTxt()
  {
    var listado :string="Lista de Usuarios \n\n";
    for(let item of this.usuarios)
    {
      listado=listado + item.legajo+' '+ item.nombre +' '+ item.apellido +' '+ item.email +'\n\n';
    }
    console.log(listado);
    this.file.writeFile(this.file.externalApplicationStorageDirectory,"ListaUsuarios.txt",listado,true)
    .then(data => 
    { 
      this.Mostrar("Se guardo archivo correctamente!\n En: "+this.file.externalApplicationStorageDirectory);
      console.log(data);
    })
    .catch(e => 
    { 
      this.Mostrar("Error al guardar archivo!");
      console.log(e);
    });
    
  }
    GuardarExcel()
  {
    //var datos = JSON.stringify(this.listado);
    this.file.writeFile(this.file.externalApplicationStorageDirectory,"Usuarios.csv",this.usuarios,true)
    .then(data => 
    { 
      this.Mostrar("Se guardo archivo correctamente!\n En: "+this.file.externalApplicationStorageDirectory);
      console.log(data);
    })
    .catch(e => 
    { 
      this.Mostrar("Error al guardar archivo!");
      console.log(e);
    });
    
  }
  LeerTxt()
  {
    this.file.readAsText(this.file.externalApplicationStorageDirectory,"ListaUsuarios.txt")
    .then(data => 
    { 
   
      this.Mostrar(data);
      console.log(data);

    })
    .catch(e => 
    { this.Mostrar("Error al leer archivo!");
    console.log(e);});
  }
    LeerTxtJson()
  {
    this.file.readAsText(this.file.externalApplicationStorageDirectory,"Usuarios.txt")
    .then(data => 
    { 
   
      this.Mostrar(data);
      console.log(data);

    })
    .catch(e => 
    { this.Mostrar("Error al leer archivo!");
    console.log(e);});
  }
  LeerJson()
  {

  }


  public chartClicked(e:any):void {console.log(e);} //SOLO MUESTRA EVENTO!
 
  public chartHovered(e:any):void {console.log(e);}//SOLO MUESTRA EVENTO!
}

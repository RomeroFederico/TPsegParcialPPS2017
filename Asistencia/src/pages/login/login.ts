import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';
import { Administrativo } from '../../components/clases/administrativo';
import { Usuario } from '../../components/clases/usuario';
import { Auth } from '../../providers/auth';
import { Ws } from '../../providers/ws';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { Device } from '@ionic-native/device';
import { Ayuda } from '../ayuda/ayuda';


@Component({
  providers:[Ws,Auth,NativeAudio,Vibration,Device],
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tipo:string = "Alumno";
  profesor:Profesor = new Profesor(1,"Octavio","Villegas","99333222","999888","octavio@gmail.com","123",30,"profesor.png","Masculino");
  alumno:Alumno = new Alumno(1,"Daniel","Gueler","99333222","100200","daniel@gmail.com","123",30,"profesor.png","Masculino");
  administrativo:Administrativo = new Administrativo(1,"Daniel","Gueler","99333222","100200","juan@gmail.com","123",30,"default.png","Masculino");
  administrador:Usuario = new Usuario(1,"Federico","Romero","99333222","100200","admin@gmail.com","123",30,"profesor.png","Masculino");

  mail:string;
  pass:string;
  listado : FirebaseListObservable<any[]>;
  loading;

  constructor(public navCtrl: NavController,
              private storage: Storage,
              public ws:Ws,private auth :Auth, 
              public alert: AlertController,private device: Device,
              public loading2:LoadingController,private nativeAudio: NativeAudio,private vibration:Vibration,private toast : ToastController,
              private firebase: AngularFireDatabase ) 
  {
    this.nativeAudio.preloadSimple("p1","assets/sonidos/sonido1.mp3");
    this.nativeAudio.preloadSimple("p2","assets/sonidos/sonido2.mp3");
    /*this.listado=firebase.list('/Lista');//CARGO LA LISTA.
    this.listado.subscribe(data => {console.log("Datos de firebase: ");console.log(data);});//MUESTRO LAS DATOS DE LAS LISTAS.
    this.ws.TraerUsuarios().then(data => {console.log(data);});*/
  }
  Vibrar()
  {
    this.vibration.vibrate(1000);
  }
  Info()
  {
      let alert = this.alert.create({
      message: this.device.platform + ' \n ' +this.device.model+ ' \n ' +this.device.version + ' \n ' +this.device.serial + ' \n ' +this.device.manufacturer ,
      buttons: ['OK']
    });
    alert.present();
  }
  Ayuda()
  {
    localStorage.setItem('ayuda','0');
    this.navCtrl.push(Ayuda);
  }
  
  MensajeToast(mensaje)
  {
      let toast = this.toast.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
  Aceptar(tipo)
  {
    console.log("Login - Es de tipo: "+tipo);
    this.nativeAudio.play("p2");
    switch (tipo) 
    {
      case 'Alumno':

        this.tipo=tipo;
        this.mail="daniel@gmail.com";
        this.pass="123";
        this.MensajeToast("Alumno");
        break;

      case 'Profesor':
        this.tipo=tipo;
        this.mail="octavio@gmail.com";
        this.pass="123";
        this.MensajeToast("Profesor");
        break;

      case 'Administrativo':
        this.tipo=tipo;
        this.mail="juan@gmail.com";
        this.pass="123";
        this.MensajeToast("Secretario");
        break;
      case 'Administrador':
        this.tipo=tipo;
        this.mail="admin@gmail.com";
        this.pass="123";
        this.MensajeToast("Administrador");
        break;
    }

  }

  Login()
  {
    var tipo = this.tipo;
    switch (tipo) 
    {
      case 'Alumno':

        this.alumno.email = this.mail;
        this.alumno.password = this.pass;
        this.storage.set("Alumno",this.alumno);
        console.log(this.alumno);
        break;

      case 'Profesor':
        this.profesor.email = this.mail;
        this.profesor.password = this.pass;
        this.storage.set("Profesor",this.profesor);
        console.log(this.profesor);
        break;

      case 'Administrativo':
        this.administrativo.email = this.mail;
        this.administrativo.password = this.pass;
        this.storage.set("Administrativo",this.administrativo);
        console.log(this.administrativo);
        break;
      case 'Administrador':
        this.administrador.email = this.mail;
        this.administrador.password = this.pass;
        this.storage.set("Administrador",this.administrador);
        console.log(this.administrador);
        break;
    }
    var obj = {email:this.mail,password:this.pass};
    this.MostrarLoading();
    
    this.ws.Login(obj)
    .then(data => 
    {
      console.log(data);
        if (data.exito==true) 
        {
            this.loading.dismiss();
            console.log("Datos correctos!...Iniciando sesion!");
            localStorage.setItem('token', data.token);
            this.ws.GetJwt()
            .then(data => 
            {
              console.log(data.rta.usuario);
              localStorage.setItem("usuario",JSON.stringify(data.rta.usuario));
              localStorage.setItem("tipo",this.tipo);
              this.AlertCorrecto(data.rta.usuario.nombre);
              this.Vibrar();
              this.nativeAudio.play("p1");
              this.navCtrl.setRoot(MenuPage);
            })
            .catch(error => 
            {
              this.loading.dismiss();
              this.AlertErrorBaseDatos();
              console.log(error);
            });
        }
        else
        {
          this.loading.dismiss();
          this.AlertIncorrecto();
            console.log("Datos Incorrectos... Reingrese!");
        }     
    })
    .catch(error => 
    {
      this.loading.dismiss();
      this.AlertErrorBaseDatos();
      console.log(error);
    });
    
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

  AlertCorrecto(nombre)
  {
    let alert = this.alert.create({
      title: 'Bienvenido! '+nombre,
      buttons: ['OK']
    });
    alert.present();
  }
  AlertErrorBaseDatos()
  {
    let alert = this.alert.create({
      title: 'Error en el servicio!',
      subTitle: 'Vuelva a intentar mas tarde...',
      buttons: ['OK']
    });
    alert.present();
  }
  AlertIncorrecto()
  {
    let alert = this.alert.create({
      title: 'Datos Incorrectos!',
      subTitle: 'Por favor reingrese...',
      buttons: ['OK']
    });
    alert.present();
  }

}

import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';
import { Administrativo } from '../../components/clases/administrativo';
import { Usuario } from '../../components/clases/usuario';
import { Auth } from '../../providers/auth';
import { Ws } from '../../providers/ws';

@Component({
  providers:[Ws,Auth],
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tipo:string = "Alumno";
  profesor:Profesor = new Profesor(1,"Octavio","Villegas","99333222","999888","octavio@gmail.com","123",30,"profesor.png","Masculino");
  alumno:Alumno = new Alumno(1,"Osmar","Flores","99333222","100200","osmar@gmail.com","123",30,"profesor.png","Masculino");
  administrativo:Administrativo = new Administrativo(1,"Daniel","Gueler","99333222","100200","juan@gmail.com","123",30,"profesor.png","Masculino");
  administrador:Usuario = new Usuario(1,"Federico","Romero","99333222","100200","admin@gmail.com","123",30,"profesor.png","Masculino");

  mail:string;
  pass:string;
  loading;

  constructor(public navCtrl: NavController,private storage: Storage,public ws:Ws,private auth :Auth, public alert: AlertController,public loading2:LoadingController) 
  {
    this.ws.TraerUsuarios().then(data => {console.log(data);});
  }
  Aceptar(tipo)
  {
    console.log("Login - Es de tipo: "+tipo);
    
    switch (tipo) 
    {
      case 'Alumno':

        this.tipo=tipo;
        this.mail=this.alumno.email;
        this.pass=this.alumno.password;
        break;

      case 'Profesor':
        this.tipo=tipo;
        this.mail=this.profesor.email;
        this.pass=this.profesor.password;
        break;

      case 'Administrativo':
        this.tipo=tipo;
        this.mail=this.administrativo.email;
        this.pass=this.administrativo.password;
        break;
      case 'Administrador':
        this.tipo=tipo;
        this.mail=this.administrador.email;
        this.pass=this.administrador.password;
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
    this.ws.Login(obj).then(data => 
    {
      //console.log(data);//EN EL DATA DEVUELVE TRUE SI EL MAIL Y EL PASS COINCIDEN EN LA BASE DE DATOS
      
      console.log(data);
        if (data.exito==true) 
        {
            this.loading.dismiss();
            console.log("Datos correctos!...Iniciando sesion!");
            localStorage.setItem('token', data.token);
            console.log(this.auth.getToken());
            this.ws.GetJwt().then(data => 
            {
              console.log(data.rta.usuario);
              localStorage.setItem("usuario",JSON.stringify(data.rta.usuario));
              this.AlertCorrecto(data.rta.usuario.nombre);
            });
            this.navCtrl.setRoot(MenuPage,{Tipo:this.tipo});
        }
        else
        {
          this.loading.dismiss();
          this.AlertIncorrecto();
            console.log("Datos Incorrectos... Reingrese!");
        }     
    });
    
  }
    MostrarLoading() 
  {
    let loading = this.loading2.create({
      spinner: 'bubbles',
      content: `Cargando, 
      Por Favor Espere un Momento...`,
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

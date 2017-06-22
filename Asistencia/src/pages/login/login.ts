import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MenuPage } from '../menu/menu';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';
import { Administrativo } from '../../components/clases/administrativo';
import { Usuario } from '../../components/clases/usuario';

import { Ws } from '../../providers/ws';

@Component({
  providers:[Ws],
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  tipo:string = "Alumno";
  profesor:Profesor = new Profesor(1,"Octavio","Villegas","99333222","999888","profesor@gmail.com","123",30,"profesor.png","Masculino");
  alumno:Alumno = new Alumno(1,"Osmar","Flores","99333222","100200","alumno@gmail.com","123",30,"profesor.png","Masculino");
  administrativo:Administrativo = new Administrativo(1,"Daniel","Gueler","99333222","100200","administrativo@gmail.com","123",30,"profesor.png","Masculino");
  administrador:Usuario = new Usuario(1,"Federico","Romero","99333222","100200","administrador@gmail.com","123",30,"profesor.png","Masculino");

  mail:string;
  pass:string;

  constructor(public navCtrl: NavController,private storage: Storage,public ws:Ws) 
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
    this.navCtrl.setRoot(MenuPage,{Tipo:this.tipo});
  }

}

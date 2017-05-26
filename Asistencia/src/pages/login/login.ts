import { Component } from '@angular/core';
import { AlertController, Platform, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
//import { RegisterPage } from '../register/register.ts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    type= "password";
    ios1="ios-eye";
    ios2="md-eye";
    show = false;
    Pass = "password";
    private todo : FormGroup;
    imagen = "assets/img/fotoDefault.png";
    unUsuario = {"email":"", "password":""};

    constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private platform: Platform,
              private formBuilder: FormBuilder) {

    this.platform = platform;
    this.Admin();
    try
    {
      //CARGO LA BASE DE DATOS EN UNA VARIABLE
    }
    catch(e)
    {

    }
  }

  toggleShow()
  {
        this.show = !this.show;
        if (this.show){
            this.type = "text";
            this.ios1="ios-eye-off";
            this.ios2="md-eye-off";
        }
        else {
            this.type = "password";
            this.ios1="ios-eye";
            this.ios2="md-eye";
        }
  }

  /*public CrearCuenta() {
    this.navCtrl.push(RegisterPage);
  }*/

  public Admin() 
  { 
    this.todo = this.formBuilder.group({
      email: ['admin@admin.com', Validators.required],
      password: ['123456', Validators.required],
    });
  } 

  public Alumno() 
  {
    this.todo = this.formBuilder.group({
      email: ['alumno@alumno.com', Validators.required],
      password: ['123456', Validators.required],
    });
  }

  public Profesor() 
  {
   this.todo = this.formBuilder.group({
      email: ['profesor@profesor.com', Validators.required],
      password: ['123456', Validators.required],
    });
  }


  public Administrativo() 
  {
    this.todo = this.formBuilder.group({
      email: ['administrativo@administrativo.com', Validators.required],
      password: ['123456', Validators.required],
    });
  }


  Salir(): void
  {
      this.platform.exitApp();
  }

  CargarImagen(): void
  {
    this.imagen = "assets/img/fotoAdmin.jpg";
  }

  Login():void
  {
    let id = "";
    let nombre = "";
    let tipo = "";
    try
    {
          if(true)//BUSCO EMAIL
          {
              if(true)//BUSCO PASS
              {
                  id = "1";
                  this.unUsuario.email = "Admin@admin.com";
                  nombre = "Admin";
                  this.unUsuario.password = "123456";
                  tipo = "administrador";
                  this.navCtrl.setRoot(HomePage,{"usuario": {"id":id, "email":this.unUsuario.email, "nombre":nombre, "password":this.unUsuario.password, "vibrar":tipo}},{animate:true, direction:"forwart"});
              }
              else
              {
                  //INFORMO PASS INCORRECTA
              }
          }
          else
          {
              //INFORMO NO SE ENCUENTRA EMAIL
          }
    }
    catch(e)
    {

    }
  }

}

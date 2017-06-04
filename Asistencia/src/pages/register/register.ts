import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
//import { Datos } from '../../providers/datos';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    show = false;
    private todo : FormGroup;
    condicion = false;
    estiloNombre="ion-textWhite";
    estiloEmail="ion-text";
    estiloPassword="ion-text";
    estiloConfirmPassword="ion-text";
    flag1 = true;
    unUsuarioR = {"id":"", "email":"", "nombre":"", "password":"", "vibrar":1};

  constructor(public navCtrlr: NavController,
              public alertCtrlr: AlertController,
              //private ds: Datos,
              private formBuilderr: FormBuilder) {

    this.todo = this.formBuilderr.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });


  }

    focusoutNombre():void
    {
      if (this.todo.value.nombre == "")
      {
        this.estiloNombre="ion-textRed";
      }
    }
    focusoutEmail():void
    {
      if (this.todo.value.email == "")
      {
        this.estiloEmail="ion-textRed";
      }
    }

    focusoutPassword():void
    {
      if (this.todo.value.password == "")
      {
        this.estiloPassword="ion-textRed";
      }
    }
    focusoutConfirmPassword():void
    {
        if (this.todo.value.confirmPassword == "")
        {
          this.estiloConfirmPassword="ion-textRed";
        }
    }


    keyupNombre():void
    {
      if (this.todo.value.nombre != "")
      {
        this.estiloNombre="ion-textGreen";
      }else
      {
        this.estiloNombre="ion-textRed";
      }
    }

    keyupEmail():void
    {
      if (this.todo.value.email != "")
      {
        this.estiloEmail="ion-textGreen";
      }else
      {
        this.estiloEmail="ion-textRed";
      }
    }

    keyupPassword():void
    {
      if (this.todo.value.password != "")
      {
        this.estiloPassword="ion-textGreen";
      }else
      {
        this.estiloPassword="ion-textRed";
      }

        if(this.todo.value.confirmPassword != "")
        {
          this.keyupConfirmPassword();
        }
        else
        {
          if(this.todo.value.password == "")
          {
              this.keyupConfirmPassword();
          }
        }
    }

    keyupConfirmPassword():void
    {
        if(this.todo.value.password == this.todo.value.confirmPassword)
        {
          this.condicion = false;
          if(this.todo.value.confirmPassword != "")
          {
            this.estiloConfirmPassword="ion-textGreen";
          }
        }
        else
        {
          this.condicion = true;
          this.estiloConfirmPassword="ion-textRed";
        }
    }

  SignIn():void{
      let unEmail: string;
      let entrar: string;
      entrar = "no";

      try
      {
       /* this.ds.TraerDatos()
          .then(datos => {

            for(let d of datos)
            {
                unEmail = d.email;
                if(unEmail == this.todo.value.email)
                {
                    entrar = "si";
                    break;
                }
            }
              if(entrar == "si")
              {
                  this.flag1 = false;
              }
              this.ValidarEmail();
          })
          .catch();*/
      }
      catch(e)
      {

      }
  }

  ValidarEmail():void
  {
            this.unUsuarioR.email = this.todo.value.email;
            this.unUsuarioR.nombre = this.todo.value.nombre;
            this.unUsuarioR.password = this.todo.value.password;
            let unId: string;
            let unEmail: string;

    try{
      /*
        if(this.flag1)
        {
            this.ds.Agregar(this.todo.value.nombre, this.todo.value.email, this.todo.value.password, 1);


           this.ds.TraerDatos()
          .then(datos => {

            for(let d of datos)
            {
                unId = d.id;
                unEmail = d.email;

                if(unEmail == this.todo.value.email)
                {
                    unId = d.id;

                  let alertr = this.alertCtrlr.create(
                    {
                      title: 'Hecho!',
                      subTitle: "Empieza a jugar " + this.unUsuarioR.nombre + "!",
                      buttons: ['Continuar']
                    });
                    alertr.present();

                    this.navCtrlr.setRoot(HomePage,{"usuario": {"id":unId, "email":this.unUsuarioR.email, "nombre":this.unUsuarioR.nombre, "password":this.unUsuarioR.password, "vibrar":this.unUsuarioR.vibrar}},{animate:true, direction:"forwart"});
                    break;
                }
            }
          })
          .catch();
        }
        else
        {console.log("reingresar");

                let alertr = this.alertCtrlr.create(
                {
                  title: 'Error',
                  subTitle: "Email ya existente",
                  buttons: ['Aceptar']
                });
                alertr.present();
                this.estiloEmail="ion-textRed";
        }
          this.flag1 = true;
          */
        }
    catch(e)
    {

    }
  }
  Cancel(): void
  {
    //this.navCtrlr.push(LoginPage);
  }

}

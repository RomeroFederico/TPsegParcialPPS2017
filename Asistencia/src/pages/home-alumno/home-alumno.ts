import { Component } from '@angular/core';
import { Platform, AlertController, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppState } from '../../app/app.global';
import { DatosAlumnoPage } from '../datos-alumno/datos-alumno';
import { NotificacionesAlumnoPage } from '../notificaciones-alumno/notificaciones-alumno';
import { ListadoDivisionesAlumnoPage } from '../listado-divisiones-alumno/listado-divisiones-alumno';
import { Alumno } from '../../components/clases/alumno';
import { LoginPage } from '../login/login';
import { AsistenciaAlumnoPage } from '../asistencia-alumno/asistencia-alumno';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home-alumno',
  templateUrl: 'home-alumno.html',
  providers:[LocalNotifications]
})
export class HomeAlumnoPage {

  tema : any = null;
  bug : boolean = null;

  loading : any;
  alumno:Alumno = new Alumno();
  notificacion = "assets/images/alumno/notificacion2.png";
  catNotificacion = 2;

  constructor(private platform: Platform,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,private localNotifications: LocalNotifications,
              public loadingController : LoadingController, public global: AppState, private storage: Storage, public events : Events){

       this.platform = platform;

       this.events.subscribe('TemaSeteado',() => {
        this.bug = true;
        this.ComprobarTemaPersonalizado();
    });

    this.events.subscribe('QuitarTemaPersonalizado',() => {
        this.bug = true;
        this.tema = null;
        this.QuitarTemaPersonalizado();
    });

    this.storage.get("TemaPersonalizado").then((data) => {
      if (data != undefined && data != null && data == true)
      {
        this.bug = true;
        this.ComprobarTemaPersonalizado();
      }
    });
       
       this.alumno = JSON.parse(localStorage.getItem("usuario"));
       this.Noti("Bienvenido: "+this.alumno.nombre+" "+this.alumno.apellido);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAlumnoPage');
  }

  // PONE EL TEMA SETEADO
  ComprobarTemaPersonalizado()
  {
    this.storage.get('Tema').then(datos => {
      this.tema = datos;
      console.log(this.tema);
      this.CrearTemaDinamico();
    })
    .catch(err=>
    {
      this.tema = null;
    });
  }

  // MODIFICA EL TEMA CON LOS DATOS DE this.tema
  CrearTemaDinamico()
  {
    console.log("Modifico el tema....");

    for(var i=0; i< document.getElementsByTagName('h1').length; i++)
    {
      var div : Element = document.getElementsByTagName('h1')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByTagName('h2').length; i++)
    {
      var div : Element = document.getElementsByTagName('h2')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByTagName('h3').length; i++)
    {
      var div : Element = document.getElementsByTagName('h3')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByTagName('h4').length; i++)
    {
      var div : Element = document.getElementsByTagName('h4')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByTagName('h5').length; i++)
    {
      var div : Element = document.getElementsByTagName('h5')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByTagName('h6').length; i++)
    {
      var div : Element = document.getElementsByTagName('h6')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByTagName('p').length; i++)
    {
      var div : Element = document.getElementsByTagName('p')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByTagName('body').length; i++)
    {
      var div : Element = document.getElementsByTagName('body')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByTagName('div').length; i++)
    {
      var div : Element = document.getElementsByTagName('div')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByClassName('toolbar-title').length; i++)
    {
      var div : Element = document.getElementsByClassName('toolbar-title')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByClassName('bar-button-default').length; i++)
    {
      var div : Element = document.getElementsByClassName('bar-button-default')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
                        color: white;`);
    }

    for(var i=0; i< document.getElementsByClassName('nombreUsuario').length; i++)
    {
      var div : Element = document.getElementsByClassName('nombreUsuario')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `color : white;
        border-radius: 10px;
        background-color: gray;
        font-size: medium;
        padding-left: 10px;
        margin-top: 40px;
        opacity: 0.7;`);
    }

    for(var i=0; i< document.getElementsByClassName('mostrarAtributo').length; i++)
    {
      var div : Element = document.getElementsByClassName('mostrarAtributo')[i];
      div.setAttribute("style", "");
      div.setAttribute("style", "color : " + this.tema.fuenteColor +  "; border-radius: 10px; background-color: gray; font-size: medium; padding-left: 10px; opacity: 0.7; text-align: right; padding-right: 10px;margin: 0px 0px 0px 0px;");
    }
    
    for(var i=0; i< document.getElementsByClassName('atributo').length; i++)
    {
      var div : Element = document.getElementsByClassName('atributo')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `color : white;
        border-radius: 10px;
        background-color: ` + this.tema.colorSecundario + `;
        font-size: medium;
        padding-left: 10px;
        margin: 0px 0px 0px 0px;`);
    }

    for(var i=0; i< document.getElementsByClassName('mostrarAtributoSmall').length; i++)
    {
      var div : Element = document.getElementsByClassName('mostrarAtributoSmall')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `color : white;
        border-radius: 10px;
        background-color: gray;
        font-size: smaller;
        padding-left: 10px;
        opacity: 0.7;
        text-align: right;
        padding-right: 10px;
        margin: 0px 0px 0px 0px;`);
    }

    for(var i=0; i< document.getElementsByClassName('tipoUsuario').length; i++)
    {
      var div : Element = document.getElementsByClassName('tipoUsuario')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `text-align : right;
        margin: 0px 10px 5px 0px;
        color: white;`);
    }

    for(var i=0; i< document.getElementsByClassName('tipoUsuarioAdministrador').length; i++)
    {
      var div : Element = document.getElementsByClassName('tipoUsuarioAdministrador')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `text-align: right;
        color : white;
        border-radius: 10px;
        background-color: ` + this.tema.colorSecundario + `;
        font-size: smaller;
        padding-right: 10px;
        opacity: 0.7;`);
    }

    for(var i=0; i< document.getElementsByClassName('titulo').length; i++)
    {
      var div : Element = document.getElementsByClassName('titulo')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `margin-left: 10px;
        font-weight: bold;
        font-size: large;`);
    }

    for(var i=0; i< document.getElementsByClassName('columnaCentrada').length; i++)
    {
      var div : Element = document.getElementsByClassName('columnaCentrada')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `display: flex;
        align-items: center;`);
    }

    for(var i=0; i< document.getElementsByClassName('tituloUsuario').length; i++)
    {
      var div : Element = document.getElementsByClassName('tituloUsuario')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `padding-left: 20px;
        color: white;`);
    }

    for(var i=0; i< document.getElementsByClassName('subtituloUsuario').length; i++)
    {
      var div : Element = document.getElementsByClassName('subtituloUsuario')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `padding-left: 20px;
        color: white;`);
    }

    for(var i=0; i< document.getElementsByClassName('miHeader').length; i++)
    {
      var div : Element = document.getElementsByClassName('miHeader')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `border-radius: 10px;
        padding-left: 10px;
        margin-bottom: 10px;
        background-color: ` + this.tema.colorPrincipal + `;`);
    }

    for(var i=0; i< document.getElementsByClassName('imagenPerfil').length; i++)
    {
      var div : Element = document.getElementsByClassName('imagenPerfil')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `border:3px solid white;
        border-radius: 10px;`);
    }

    for(var i=0; i< document.getElementsByClassName('icono').length; i++)
    {
      var div : Element = document.getElementsByClassName('icono')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `color: ` + this.tema.colorPrincipal + `;`);
    }

    for(var i=0; i< document.getElementsByClassName('botonAceptar').length; i++)
    {
      var div : Element = document.getElementsByClassName('botonAceptar')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `background-color: olivedrab;
      font-size: 1.5rem;
      border-radius: 10px;
      height: 80px;`);
    }

    for(var i=0; i< document.getElementsByClassName('botonCancelar').length; i++)
    {
      var div : Element = document.getElementsByClassName('botonCancelar')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `background-color: crimson;
      font-size: 1.5rem;
      border-radius: 10px;
      height: 80px;`);
    }

    for(var i=0; i< document.getElementsByClassName('botonInfo').length; i++)
    {
      var div : Element = document.getElementsByClassName('botonInfo')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `background-color: orange;
      font-size: 1.5rem;
      border-radius: 10px;
      height: 80px;`);
    }

    for(var i=0; i< document.getElementsByClassName('alta').length; i++)
    {
      var alta : Element = document.getElementsByClassName('alta')[i];

      for (var j=0; j< alta.getElementsByTagName('div').length; j++)
      {
        var div : Element = alta.getElementsByTagName('div')[j];

        for (var k=0; k< div.getElementsByClassName('input-wrapper').length; k++)
        {
          var input : Element = div.getElementsByClassName('input-wrapper')[k];

          input.setAttribute("style", ``);
          input.setAttribute("style", `background-color : ` + this.tema.colorPrincipal +`;`);

          for (var l=0; l< input.getElementsByTagName('ion-label').length; l++)
          {
            var label : Element = input.getElementsByTagName('ion-label')[l];

            label.setAttribute("style", ``);
            label.setAttribute("style", `color : white;`);
          }
        }
      }

      for (var j=0; j< alta.getElementsByTagName('ion-list-header').length; j++)
      {
        var header : Element = alta.getElementsByTagName('ion-list-header')[j];

        header.setAttribute("style", ``);
        header.setAttribute("style", `background-color : ` + this.tema.colorPrincipal +`;`);

        for (var m=0; m< header.getElementsByTagName('div').length; m++)
        {
          var div : Element = header.getElementsByTagName('div')[m];

          for (var k=0; k< div.getElementsByClassName('input-wrapper').length; k++)
          {
            var input : Element = div.getElementsByClassName('input-wrapper')[k];

            input.setAttribute("style", ``);
            input.setAttribute("style", `background-color : ` + this.tema.colorPrincipal +`;`);

            for (var l=0; l< input.getElementsByTagName('ion-label').length; l++)
            {
              var label : Element = input.getElementsByTagName('ion-label')[l];

              label.setAttribute("style", ``);
              label.setAttribute("style", `color : white;`);
            }
          }

        }
      }
    }

    for(var i=0; i< document.getElementsByTagName('ion-content').length; i++)
    {
      var div : Element = document.getElementsByTagName('ion-content')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `font-family: ` + this.tema.fuente + `;
      font-style: ` + (this.tema.fuenteCursiva == true? 'italic' : 'normal' ) + `;
      font-size: ` + this.tema.fuenteSize + `;
      color: ` + this.tema.fuenteColor + `;
      background-color: ` + this.tema.colorFondo + `;`);
    }

    for(var i=0; i< document.getElementsByTagName('ion-navbar').length; i++)
    {
      var div : Element = document.getElementsByTagName('ion-navbar')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `font-family: ` + this.tema.fuente + `;
      font-style: ` + (this.tema.fuenteCursiva == true? 'italic' : 'normal' ) + `;
      font-size: ` + this.tema.fuenteSize + `;
      color: ` + this.tema.fuenteColor + `;`);
    }

    for(var i=0; i< document.getElementsByClassName('toolbar-background').length; i++)
    {
      var div : Element = document.getElementsByClassName('toolbar-background')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
      background-color: `+ this.tema.colorPrincipal +`;`);
    }

    for(var i=0; i< document.getElementsByClassName('toggle-checked').length; i++)
    {
      var div : Element = document.getElementsByClassName('toggle-checked')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
      background-color: `+ this.tema.colorPrincipal +`;`);
    }

    for(var i=0; i< document.getElementsByClassName('item-inner').length; i++)
    {
      var div : Element = document.getElementsByClassName('item-inner')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `background-color: `+ this.tema.colorFondo +`;`);
    }

    for(var i=0; i< document.getElementsByClassName('bug').length; i++)
    {
      var div : Element = document.getElementsByClassName('bug')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `height: 50px;`);
    }
  }

  // Quitar tema
  QuitarTemaPersonalizado()
  {
    console.log("Elimino el tema....");
    for(var i=0; i< document.getElementsByTagName('h1').length; i++)
    {
      var div : Element = document.getElementsByTagName('h1')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('h2').length; i++)
    {
      var div : Element = document.getElementsByTagName('h2')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('h3').length; i++)
    {
      var div : Element = document.getElementsByTagName('h3')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('h4').length; i++)
    {
      var div : Element = document.getElementsByTagName('h4')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('h5').length; i++)
    {
      var div : Element = document.getElementsByTagName('h5')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('h6').length; i++)
    {
      var div : Element = document.getElementsByTagName('h6')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('p').length; i++)
    {
      var div : Element = document.getElementsByTagName('p')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('body').length; i++)
    {
      var div : Element = document.getElementsByTagName('body')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('div').length; i++)
    {
      var div : Element = document.getElementsByTagName('div')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('toolbar-title').length; i++)
    {
      var div : Element = document.getElementsByClassName('toolbar-title')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('bar-button-default').length; i++)
    {
      var div : Element = document.getElementsByClassName('bar-button-default')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('nombreUsuario').length; i++)
    {
      var div : Element = document.getElementsByClassName('nombreUsuario')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('mostrarAtributo').length; i++)
    {
      var div : Element = document.getElementsByClassName('mostrarAtributo')[i];
      div.setAttribute("style", "");
    }
    
    for(var i=0; i< document.getElementsByClassName('atributo').length; i++)
    {
      var div : Element = document.getElementsByClassName('atributo')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('mostrarAtributoSmall').length; i++)
    {
      var div : Element = document.getElementsByClassName('mostrarAtributoSmall')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('tipoUsuario').length; i++)
    {
      var div : Element = document.getElementsByClassName('tipoUsuario')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('tipoUsuarioAdministrador').length; i++)
    {
      var div : Element = document.getElementsByClassName('tipoUsuarioAdministrador')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('titulo').length; i++)
    {
      var div : Element = document.getElementsByClassName('titulo')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('columnaCentrada').length; i++)
    {
      var div : Element = document.getElementsByClassName('columnaCentrada')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('tituloUsuario').length; i++)
    {
      var div : Element = document.getElementsByClassName('tituloUsuario')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('subtituloUsuario').length; i++)
    {
      var div : Element = document.getElementsByClassName('subtituloUsuario')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('miHeader').length; i++)
    {
      var div : Element = document.getElementsByClassName('miHeader')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('imagenPerfil').length; i++)
    {
      var div : Element = document.getElementsByClassName('imagenPerfil')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('icono').length; i++)
    {
      var div : Element = document.getElementsByClassName('icono')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('botonAceptar').length; i++)
    {
      var div : Element = document.getElementsByClassName('botonAceptar')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('botonCancelar').length; i++)
    {
      var div : Element = document.getElementsByClassName('botonCancelar')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('botonInfo').length; i++)
    {
      var div : Element = document.getElementsByClassName('botonInfo')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('alta').length; i++)
    {
      var alta : Element = document.getElementsByClassName('alta')[i];

      for (var j=0; j< alta.getElementsByTagName('div').length; j++)
      {
        var div : Element = alta.getElementsByTagName('div')[j];

        for (var k=0; k< div.getElementsByClassName('input-wrapper').length; k++)
        {
          var input : Element = div.getElementsByClassName('input-wrapper')[k];

          input.setAttribute("style", ``);

          for (var l=0; l< input.getElementsByTagName('ion-label').length; l++)
          {
            var label : Element = input.getElementsByTagName('ion-label')[l];

            label.setAttribute("style", ``);
          }
        }
      }

      for (var j=0; j< alta.getElementsByTagName('ion-list-header').length; j++)
      {
        var header : Element = alta.getElementsByTagName('ion-list-header')[j];

        header.setAttribute("style", ``);

        for (var m=0; m< header.getElementsByTagName('div').length; m++)
        {
          var div : Element = header.getElementsByTagName('div')[m];

          for (var k=0; k< div.getElementsByClassName('input-wrapper').length; k++)
          {
            var input : Element = div.getElementsByClassName('input-wrapper')[k];

            input.setAttribute("style", ``);

            for (var l=0; l< input.getElementsByTagName('ion-label').length; l++)
            {
              var label : Element = input.getElementsByTagName('ion-label')[l];

              label.setAttribute("style", ``);
            }
          }

        }
      }
    }

    for(var i=0; i< document.getElementsByTagName('ion-content').length; i++)
    {
      var div : Element = document.getElementsByTagName('ion-content')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByTagName('ion-navbar').length; i++)
    {
      var div : Element = document.getElementsByTagName('ion-navbar')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('toolbar-background').length; i++)
    {
      var div : Element = document.getElementsByClassName('toolbar-background')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('toggle-checked').length; i++)
    {
      var div : Element = document.getElementsByClassName('toggle-checked')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('item-inner').length; i++)
    {
      var div : Element = document.getElementsByClassName('item-inner')[i];
      div.setAttribute("style", ``);
    }

    for(var i=0; i< document.getElementsByClassName('bug').length; i++)
    {
      var div : Element = document.getElementsByClassName('bug')[i];
      div.setAttribute("style", ``);
    }
  }

    Noti(mensaje)
  {
  this.localNotifications.schedule({
   text: mensaje,
   at: new Date(new Date().getTime() + 1000),
   led: 'FF0000',
   sound: null
});
  }
  Aceptar(opcion)
  {
    this.alumno = JSON.parse(localStorage.getItem("usuario"));
    var page;
    switch (opcion) {
      case '0':

        page = DatosAlumnoPage;
        break;

      case '1':

        page = ListadoDivisionesAlumnoPage;
        break;

      case '2':

        page = AsistenciaAlumnoPage;
        break;
     case '3':
        setTimeout(() =>
        {
            this.notificacion = "assets/images/alumno/notificacion.png";
            this.catNotificacion = 0;
        },
        2000);
        page = NotificacionesAlumnoPage;
        break;
    }
    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      //this.animacionSeleccion[this.seleccionAnimar] = "";
      this.navCtrl.push(page,{Alumno:this.alumno});
    });

    this.loading = loading;
    this.loading.present();
  }

  Salir()
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('¿Que desea hacer?');

    alert.addInput({
      type: 'radio',
      label: 'Cerrar sesion, ir a Login',
      value: 'cerrarSesion',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Salir de la aplicacion',
      value: 'salir'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Aceptar',
      handler: data => {
        if(data == "cerrarSesion")
        {
            this.navCtrl.setRoot(LoginPage);
            localStorage.setItem('usuario', null);
        }
        else
        {
            this.platform.exitApp();
        }
      }
    });
    alert.present();
  }

}



import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppState } from '../../app/app.global';

import { Ws } from '../../providers/ws';

import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';

import { HomeAdministrativoPage } from '../home-administrativo/home-administrativo';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';//FIREBASE!

import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-asistencia-administrativo',
  templateUrl: 'asistencia-administrativo.html',
  providers: [Ws,NativeAudio,Vibration,LocalNotifications]
})
export class AsistenciaAdministrativoPage {

  tema : any = null;
  bug : boolean = null;

  division : Division;
  divisionModificar : any;
  alumnos : Array<{alumno : Alumno, faltas : number, estado : string, asistio : boolean}> = null;

  cargando : any = null;
  //miLista:any;
  listado : FirebaseListObservable<any[]>;//FIREBASE!

  constructor(public navCtrl: NavController, public navParams: NavParams, public ws : Ws, private localNotifications: LocalNotifications,
              public loadingController : LoadingController, public alertCtrl: AlertController,private firebase: AngularFireDatabase, 
              public toast : ToastController, public nativeAudio: NativeAudio, public vibration:Vibration,
              public global: AppState, private storage: Storage, public events : Events)
  {
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

    this.nativeAudio.preloadSimple("p1","assets/sonidos/Correcto.mp3");
    this.listado=firebase.list('/Lista');//CARGO LA LISTA.
    this.listado.subscribe(data => {console.log("Datos de firebase: ");console.log(data);});//MUESTRO LAS DATOS DE LAS LISTAS.

    this.division = this.navParams.get("division");

    this.division.claseActual = Number(this.division.claseActual) + 1;

    //this.alumnos = new Array<{alumno : Alumno, faltas : number, estado : string, asistio : boolean}>();

    this.CargarAlumnos();
    
    //this.lista.subscribe(data => {console.log(data);this.miLista=data;});//ver
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsistenciaAdministrativoPage');
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

  /**
  * Volver a la pagina anterior.
  */
  Volver()
  {
    this.navCtrl.pop();
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
  Vibrar()
  {
    console.log("Vibrar");
    this.vibration.vibrate(500);
  }

  Sonar()
  {
    console.log("Sonar");
    this.nativeAudio.play("p1");
  }

  Cancelar()
  {
    let confirm = this.alertCtrl.create({
      title: 'Volver',
      message: 'Desea salir del tomado de lista?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.Volver();
          }
        }
      ]
    });
    confirm.present();
  }

  TomarLista()
  {
    let confirm = this.alertCtrl.create({
        title: 'Tomar lista',
        message: 'La lista sera tomada, estas seguro?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {}
          },
          {
            text: 'Aceptar',
            handler: () => {
              console.log("Lista tomada!!!");
              this.ModificarDivision();
            }
          }
        ]
    });
    confirm.present(); 
  }

  CargarAlumnos()
  {
    // var alumnos : Array<Alumno> = new Array<Alumno>();
    // alumnos.push(new Alumno(1, "uno", "UNO", "456", "1001", "b@b.com", "789999", 35, "default.png","Masculino"));
    // alumnos.push(new Alumno(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png","Masculino"));
    // alumnos.push(new Alumno(3, "tres", "TRES", "456", "1003", "b@b.com", "789999", 35, "default.png","Masculino"));

    // alumnos.forEach(alumno => {
    //   this.alumnos.push({alumno : alumno, faltas : 2, estado : 'Cursando', asistio : false});
    // });

    this.MostrarLoading("alumnos de la division")

    this.ws.TraerAlumnosDivision(this.division.idDivision).then((data) => {

      this.cargando.dismiss();
      console.log(data);

      if (data.Exito)
      {
        this.alumnos = data.Alumnos;

        for (var i = 0; i < data.Alumnos.length; i++) {
          this.alumnos[i].alumno = data.Alumnos[i];
          this.alumnos[i].faltas = data.Alumnos[i].faltas;
          this.alumnos[i].estado = data.Alumnos[i].estado;
          this.alumnos[i].asistio = false;
        }

        console.log(this.alumnos);
      }

    })
    .catch((error) => {

      this.cargando.dismiss();
      this.ReintentarCargarAlumnos();
      console.log(error);

    });
  }

  ModificarDivision()
  { 
    this.MostrarLoading("modificacion de la division");

    if (this.division.claseActual != this.division.cantClases)
    {
      var hoy = new Date();
      hoy.setDate(hoy.getDate() + 7);
      this.division.fechaProxClase = hoy;
    }
    else
    {
      this.division.estado = "Terminada";
      this.division.fechaProxClase = null;
    }

    this.divisionModificar = this.division;
    if (this.division.fechaProxClase != null)
      this.divisionModificar.fechaProxClase = this.division.fechaProxClase.getFullYear() + "-" + (this.division.fechaProxClase.getMonth() + 1) + "-" + this.division.fechaProxClase.getDate();

    console.log(this.divisionModificar);

    this.ws.ModificarDivision(this.divisionModificar).then((data) => {

      this.cargando.dismiss();
      console.log(data);
      
      //Modificar alumnos division y firebase....
      if (data.Exito)
      {
        console.log("Exito");
        this.ModificarAlumnosDivision();
      }
      else
      {
        this.ReintentarModificarDivision();
      }

    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarModificarDivision(); console.log(error); });
  }

  ModificarAlumnosDivision()
  {
    let alumnos = new Array<{idAlumno : number, idDivision : number, estado : string, faltas : number}>();

    for (var index = 0; index < this.alumnos.length; index++) {
      var faltas = Number(this.alumnos[index].faltas); 
      if (this.alumnos[index].asistio != true && this.alumnos[index].estado == "Cursando")
        faltas++;
      alumnos.push({idAlumno : this.alumnos[index].alumno.idUsuario, idDivision : this.division.idDivision, estado : this.alumnos[index].estado, faltas : faltas});
    }

    console.log(alumnos);

    this.MostrarLoading("modificacion de los alumnos de la division");

    this.ws.ModificarAlumnosDivision(alumnos).then((data) => {

      this.cargando.dismiss();
      console.log(data);

      if (data.Exito)
      {
        // GUARDAR EN FIREBASE...
        console.log("Exito al modificar alumnos de la division.");
        this.GuardarAsistencia(alumnos);
      }
      else
      {
        this.ReintentarModificarAlumnosDivision();
      }
    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarModificarAlumnosDivision(); console.log(error); })
  }

  GuardarAsistencia(alumnos : Array<{idAlumno : number, idDivision : number, estado : string, faltas : number}>)
  {
    // var subir : {division : Division, clase : number, fecha : string,alumnos : Array<{alumno : Alumno, asistio : boolean, estado : string, faltas : number}>} = {division : null, clase : null, fecha : null,alumnos : Array<{alumno : Alumno, asistio : boolean, estado : string, faltas : number}>()} ;
    // subir.division = this.divisionModificar;
    // subir.clase = Number(this.division.claseActual);

    var hoy = new Date();
    hoy.setDate(hoy.getDate());
    var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    
    // for (var index = 0; index < this.alumnos.length; index++) {
    //   subir.alumnos.push({alumno : this.alumnos[index].alumno, asistio : this.alumnos[index].asistio, estado : alumnos[index].estado, faltas : alumnos[index].faltas});
    // }

    var subir : Array<{idDivision : number, idAlumno : number, nombreDivision : string, materia : string , nombreAlumno : string, apellidoAlumno : string, asistio : boolean, clase : number, fecha : string}> = Array<{idDivision : number, idAlumno : number, nombreDivision : string, materia : string , nombreAlumno : string, apellidoAlumno : string, asistio : boolean, clase : number, fecha : string}>();

    for (var index = 0; index < this.alumnos.length; index++) {
      subir.push({idDivision : this.divisionModificar.idDivision, idAlumno : this.alumnos[index].alumno.idUsuario, nombreDivision : this.divisionModificar.nombre, materia : this.divisionModificar.materia.nombre, nombreAlumno : this.alumnos[index].alumno.nombre, apellidoAlumno : this.alumnos[index].alumno.apellido, asistio : this.alumnos[index].asistio, clase :  Number(this.division.claseActual), fecha : fecha });
    }

    console.log(subir);

    this.MostrarLoading("listado de asistencia del dia");

    this.listado.push(subir).then(() => {

      this.cargando.dismiss();
      this.Sonar();
      this.Noti("Se todo lista correctamen!");
      this.MostrarToast("Lista tomada exitosamente!!!");
      this.navCtrl.setRoot(HomeAdministrativoPage);

    })
    .catch((error) => { this.cargando.dismiss(); this.MostrarToast("La lista de asistencias no se guardo."); this.navCtrl.setRoot(HomeAdministrativoPage); console.log("Error"); });// CON ESA FUNCION SUBO EL JSON A FIREBASE

    this.listado.push(subir);// CON ESA FUNCION SUBO EL JSON A FIREBASE
    
    //ACA SE SUBE EN FIREBASE EL OBJETO SUBIR...AL TERMINAR EL PROCESO IR AL MENU PRINCIPAL -> HOME CON SET ROOT, MOSTRAR UN MENSAJE SI SE GUARDO.
  }
  GenerateArray(obj)//PARA FIREBASE!
  {
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }
  MostrarLoading(mensaje : string) 
  {
    this.cargando = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando ` + mensaje + `, 
      Por Favor Espere un Momento...`,
    });

    this.cargando.present();
  }

  MostrarToast(mensaje)
  {
    let toast = this.toast.create({
      message: mensaje,
      duration: 2000
    });

    toast.present();
  }

  ReintentarCargarAlumnos()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de divisiones?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.CargarAlumnos();
          }
        }
      ]
    });
    confirm.present();
  }

  ReintentarModificarDivision()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la modificacion de la division?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.ModificarDivision();
          }
        }
      ]
    });
    confirm.present();
  }

  ReintentarModificarAlumnosDivision()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la modificacion de los alumnos de la division?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.ModificarAlumnosDivision();
          }
        }
      ]
    });
    confirm.present();
  }

}

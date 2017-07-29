import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, Platform, AlertController,Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListadoAdministradorPage } from '../listado-administrador/listado-administrador';
import { AgregarAdministradorPage } from '../agregar-administrador/agregar-administrador';
import { LoginPage } from '../login/login';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AppState } from '../../app/app.global';

@Component({
  selector: 'page-home-administrador',
  templateUrl: 'home-administrador.html',
  providers:[LocalNotifications]
})
export class HomeAdministradorPage {

  tema : any = null;
  bug : boolean = null;

  animacionSeleccion : Array<string> = ["", "", "", "", "", "", "", "", "", ""];
  seleccionAnimar : number;

  loading : any;
  iconos : string = "Grandes";

  constructor(public navCtrl: NavController, public navParams: NavParams,private localNotifications: LocalNotifications,
              public loadingController : LoadingController, public actionSheetController : ActionSheetController, private platform: Platform,
              public alertCtrl: AlertController, public global: AppState, private storage: Storage, public events : Events) 
  {
    this.Noti("Bienvenido Administrador!");

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
        this.global.set("theme", "");
        this.bug = true;
        this.ComprobarTemaPersonalizado();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdministradorPage');
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
  * Seleccion de una opcion de la pagina principal.
  * @param opcion numero que representa la opcion seleccionada.
  */
  Seleccion(opcion : number)
  {
    console.log("Selecciono " + opcion);
    this.animacionSeleccion[opcion] = "animated flash infinite";
    this.seleccionAnimar = opcion;

    if (opcion != 9)
      this.MostrarLoading(this.SeleccionOpcion(opcion));
    else
    {
      this.Salir();
      this.animacionSeleccion[opcion] = "";
      this.seleccionAnimar = 0;
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

  /**
  * A partir de la opcion seleccionada de 'Seleccion', se obtiene la pagina a mostrar y lo que se quiere mostrar (Materia, Usuario, Division, Aula).
  * @param opcion numero que representa la opcion seleccionada.
  */
  SeleccionOpcion(opcion)
  {
    var objOpcion = {ruta : "listado-administrador", mensaje : "", tipo : ""};

    switch (opcion) {
      case 0:

        objOpcion.mensaje = "Listado de usuarios";
        objOpcion.tipo = "Usuario";
        break;

      case 1:

        objOpcion.mensaje = "Agregar usuario";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Usuario";
        break;

      case 2:

        objOpcion.mensaje = "Listado de divisiones";
        objOpcion.tipo = "Division";
        break;

      case 3:

        objOpcion.mensaje = "Agregar division";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Division";
        break;

      case 4:

        objOpcion.mensaje = "Listado de materias";
        objOpcion.tipo = "Materia";
        break;

      case 5:

        objOpcion.mensaje = "Agregar materia";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Materia";
        break;

      case 6:

        objOpcion.mensaje = "Listado de aulas";
        objOpcion.tipo = "Aula";
        break;
    
      case 7:

        objOpcion.mensaje = "Agregar aula";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Aula";
        break;

      default:

        objOpcion.mensaje = "Agregar ciclo";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Ciclo";
        break;
    }

    return objOpcion;
  }

  /**
  * Muestra un menu para cambiar la vista de los iconos de la pagina principal.
  */
  MostrarOpcionesVista() 
  {
   let actionSheet = this.actionSheetController.create({
     title: 'Cambiar vista',
     buttons: [
       {
         text: 'Iconos Grandes',
         icon: "expand",
         handler: () => {
           this.iconos = "Grandes";
         }
       },
      {
         text: 'Iconos Pequeños',
         icon: 'contract',
         handler: () => {
           this.iconos = "Pequeños";
         }
       },
      {
         text: 'Lista',
         icon : "list-box",
         handler: () => {
           this.iconos = "Lista";
         }
       },
       {
         text: 'Cancelar',
         icon: 'exit',
         role: 'cancel',
       }
     ]
   });

   actionSheet.present();
  }

  /**
  * Carga la pagina a mostrar.
  * @param seleccion objeto obtenido de la funcion 'SeleccionOpcion', contiene la pagina a mostrar, el titulo de la misma y el tipo de dato a manejar.
  */
  MostrarLoading(seleccion) 
  {
    console.log(seleccion);

    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando ` + seleccion.mensaje + `, 
      Por Favor Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      this.animacionSeleccion[this.seleccionAnimar] = "";
      this.navCtrl.push(seleccion.ruta == "agregar-administrador"? AgregarAdministradorPage : ListadoAdministradorPage,
                           {opciones : seleccion},
                           {animate: true, direction: 'forward'});
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

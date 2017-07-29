import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Usuario } from '../../components/clases/usuario';
//import { Administrador } from '../../components/clases/administrador';
import { Administrativo } from '../../components/clases/administrativo';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';
import { Ciclo } from '../../components/clases/ciclo';

import { Ws } from '../../providers/ws';

import { AppState } from '../../app/app.global';

@Component({
  selector: 'page-datos-administrador',
  templateUrl: 'datos-administrador.html',
  providers: [Ws],
})
export class DatosAdministradorPage {

  tema : any = null;
  bug : boolean = null;

  tipo : string;

  usuario : Usuario;
  divisiones : Array<Division>;
  divisionesUsuario : Array<any>;

  division : Division;
  alumnos : Array<Alumno>;
  alumnosDivision : Array<any>;

  materia : Materia;
  divisionesMateria : Array<Division>;

  aula : Aula;
  divisionesAula : Array<Division>;

  cargando : any = null;

  // Array con cada una de los estados de la lista desplegable.
  shownGroup = [null, null, null, null, null];

  constructor(public navCtrl : NavController, public navParams : NavParams, public ws : Ws,
              public loadingController : LoadingController, public alertCtrl: AlertController, 
              public global: AppState, private storage: Storage, public events : Events)
  {
    this.tipo = this.navParams.get("tipo");

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

    if (this.tipo == "Usuario")
    { 
      this.usuario = this.navParams.get("usuario");

      //this.ObtenerDivisiones();

      if (this.DevolverTipo(this.usuario) == "Alumno")
        this.ObtenerDivisionesAlumno();
      else if (this.DevolverTipo(this.usuario) == "Profesor")
        this.ObtenerDivisionesProfesor();
    }
    else if (this.tipo == "Division")
    {
      this.division = this.navParams.get("division");
      console.log(this.division);

      //this.ObtenerAlumnos();
      this.ObtenerAlumnosDivision();
    }
    else if (this.tipo == "Materia")
    {
      this.materia = this.navParams.get("materia");
      this.ObtenerDivisionesMateria();
    }
    else if (this.tipo == "Aula")
    {
      this.aula = this.navParams.get("aula");
      this.ObtenerDivisionesAula();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosAdministradorPage');
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

  MostrarLoading(mensaje : string) 
  {
    this.cargando = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando ` + mensaje + `, 
      Por Favor Espere un Momento...`,
    });

    this.cargando.present();
  }  

  NoImplementado()
  {
    let confirm = this.alertCtrl.create({
      title: 'Informacion',
      message: 'No implementado aun...',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  /**
  * Devuelve el tipo de usuario en formato de cadena.
  * @param usuario usuario del sistema.
  */
  DevolverTipo(usuario)
  {
    if (usuario instanceof Administrativo)
      return "Administrativo";
    else if (usuario instanceof Profesor)
      return "Profesor";
    else
      return "Alumno";
  }

  /**
  * Devuelve el color correspondiente al tipo de usuario a mostrar.
  */
  DevolverColor()
  {
    if (this.tipo == "Usuario")
    {
      var tipo = this.DevolverTipo(this.usuario)
      if (tipo == "Administrativo")
        return 'danger';
      else if (tipo == "Profesor")
        return 'secondary';
      else
        return 'primary';
    }
    else
      return 'dark';  
  }

  /**
  * Carga las divisiones precargadas para la prueba sin base de datos.
  */
  ObtenerDivisiones()
  {
    this.divisiones = new Array<Division>();

    this.divisiones.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
                                      new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png","Masculino"),
                                      "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    this.divisiones.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "default.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png","Masculino"),
                                      "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
                                      ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    this.divisiones.push(new Division(2, new Aula(1, "104", 1), new Materia(3, "Matematica II", "default.png"),
                                      new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png","Masculino"),
                                      "4-A", new Ciclo(1, 2016, 2), "Mañana",new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
                                      ["Lunes"], "Terminada", 18, 9, 15, 15, null));
  }

  /**
  * Carga los alumnos precargados para la prueba sin base de datos.
  */
  ObtenerAlumnos()
  {
    this.alumnos = new Array<Alumno>();

    this.alumnos.push(new Alumno(3, "tres", "TRES", "789", "1003", "c@c.com", "811124", 18, "default.png","Masculino"));
    this.alumnos.push(new Alumno(6, "seis", "SEIS", "101", "1006", "f@f.com", "811124", 21, "default.png","Masculino"));
    this.alumnos.push(new Alumno(9, "nueve", "NUEVE", "999", "1009", "i@i.com", "811124", 25, "default.png","Masculino"));
  }

  /**
  * Carga las divisiones del usuario alumno. Luego se hara con la base de datos.
  */
  ObtenerDivisionesAlumno()
  {
    console.log("Cargo divisiones del alumno");
    // this.divisionesUsuario = new Array();

    // this.divisionesUsuario.push({division : this.divisiones[0], estado: "Cursando", faltas: 2});

    // this.divisionesUsuario.push({division : this.divisiones[1], estado: "Cursando", faltas: 0});

    // this.divisionesUsuario.push({division : this.divisiones[2], estado: "Terminada", faltas: 5});

    this.divisionesUsuario = new Array();

    this.MostrarLoading("divisiones del alumno");

    this.ws.TraerDivisionesDelAlumno(this.usuario.idUsuario).then(
      (data) => {
        console.log(data);
        
        if (data.Exito)
        {
          data.Divisiones.forEach(division => {

            this.divisionesUsuario.push({division : division, estado: division.estadoAlumno, faltas: division.faltas});
            this.divisionesUsuario[this.divisionesUsuario.length - 1].division.materia = new Materia(division.idMateria, division.nombreMateria, division.img);
            this.divisionesUsuario[this.divisionesUsuario.length - 1].division.ciclo = new Ciclo(division.idCiclo, division.anio, division.cuatrimestre);
            this.divisionesUsuario[this.divisionesUsuario.length - 1].division.dias = [division.dia1, division.dia2, division.dia3];
            let fechaInicio = division.fechaInicio.split('-');
            this.divisionesUsuario[this.divisionesUsuario.length - 1].division.fechaInicio = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
            let fechaFin = division.fechaFin.split('-');
            this.divisionesUsuario[this.divisionesUsuario.length - 1].division.fechaFin = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);
            if (division.fechaProxClase != null)
            {
              let fechaProxClase = division.fechaProxClase.split('-');
              this.divisionesUsuario[this.divisionesUsuario.length - 1].division.fechaProxClase = new Date(fechaProxClase[0], fechaProxClase[1] - 1, fechaProxClase[2]);
            }
            else
              this.divisionesUsuario[this.divisionesUsuario.length - 1].division.fechaProxClase = null;
          });
        }

        this.cargando.dismiss();
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarDivisionesAlumno(); console.log(error)});
  }

  ReintentarCargarDivisionesAlumno()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de divisiones del alumno?',
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
            this.ObtenerDivisionesAlumno();
          }
        }
      ]
    });
    confirm.present();
  }

  ObtenerDivisionesProfesor()
  {
    console.log("Cargo divisiones del profesor");
    // this.divisionesUsuario = new Array();

    // this.divisionesUsuario.push({division : this.divisiones[0], estado: "Cursando", faltas: 2});

    // this.divisionesUsuario.push({division : this.divisiones[1], estado: "Cursando", faltas: 0});

    // this.divisionesUsuario.push({division : this.divisiones[2], estado: "Terminada", faltas: 5});

    this.divisionesUsuario = new Array();

    this.MostrarLoading("divisiones del profesor");

    this.ws.TraerDivisionesDelProfesor(this.usuario.idUsuario).then(
      (data) => {
        console.log(data);
        
        if (data.Exito)
        {
          data.Divisiones.forEach(division => {

            this.divisionesUsuario.push(division);
            this.divisionesUsuario[this.divisionesUsuario.length - 1].materia = new Materia(division.idMateria, division.nombreMateria, division.img);
            this.divisionesUsuario[this.divisionesUsuario.length - 1].ciclo = new Ciclo(division.idCiclo, division.anio, division.cuatrimestre);
            this.divisionesUsuario[this.divisionesUsuario.length - 1].dias = [division.dia1, division.dia2, division.dia3];
            let fechaInicio = division.fechaInicio.split('-');
            this.divisionesUsuario[this.divisionesUsuario.length - 1].fechaInicio = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
            let fechaFin = division.fechaFin.split('-');
            this.divisionesUsuario[this.divisionesUsuario.length - 1].fechaFin = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);
            if (division.fechaProxClase != null)
            {
              let fechaProxClase = division.fechaProxClase.split('-');
              this.divisionesUsuario[this.divisionesUsuario.length - 1].fechaProxClase = new Date(fechaProxClase[0], fechaProxClase[1] - 1, fechaProxClase[2]);
            }
            else
              this.divisionesUsuario[this.divisionesUsuario.length - 1].fechaProxClase = null;
          });
        }

        this.cargando.dismiss();
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarDivisionesProfesor(); console.log(error)});
  }

  ReintentarCargarDivisionesProfesor()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de divisiones del profesor?',
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
            this.ObtenerDivisionesProfesor();
          }
        }
      ]
    });
    confirm.present();
  }

  // /**
  // * Carga las divisiones del usuario profesor. Luego se hara con la base de datos.
  // */
  // ObtenerDivisionesProfesor()
  // {
  //   this.divisionesUsuario = new Array();

  //   this.divisionesUsuario = this.divisiones.filter((item) => { return item.profesor.idUsuario == this.usuario.idUsuario; });
  // }

  /**
  * Carga las divisiones de la materia. Luego se hara con la base de datos.
  */
  ObtenerDivisionesMateria()
  {
    // this.divisionesMateria = new Array<Division>();

    // this.divisionesMateria.push(new Division(1, new Aula(1, "103", 1), this.materia,
    //                                   new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
    //                                   "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
    //                                   ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    // this.divisionesMateria.push(new Division(2, new Aula(1, "103", 1), this.materia,
    //                                   new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
    //                                   "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
    //                                   ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    // this.divisionesMateria.push(new Division(2, new Aula(1, "104", 1), this.materia,
    //                                   new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
    //                                   "4-A", new Ciclo(1, 2016, 2), "Mañana",new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
    //                                   ["Lunes"], "Terminada", 18, 9, 15, 15, null));

    this.divisionesMateria = new Array<Division>();

    this.MostrarLoading("divisiones de la materia");

    this.ws.TraerDivisionesDeLaMateria(this.materia.idMateria).then(
      (data) => {
        console.log(data);
        
        if (data.Exito)
        {
          data.Divisiones.forEach(division => {

            this.divisionesMateria.push(division);
            this.divisionesMateria[this.divisionesMateria.length - 1].materia = this.materia;
            this.divisionesMateria[this.divisionesMateria.length - 1].aula = new Aula(division.idAula, division.nombreAula, division.piso);
            this.divisionesMateria[this.divisionesMateria.length - 1].ciclo = new Ciclo(division.idCiclo, division.anio, division.cuatrimestre);
            this.divisionesMateria[this.divisionesMateria.length - 1].dias = [division.dia1, division.dia2, division.dia3];
            let fechaInicio = division.fechaInicio.split('-');
            this.divisionesMateria[this.divisionesMateria.length - 1].fechaInicio = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
            let fechaFin = division.fechaFin.split('-');
            this.divisionesMateria[this.divisionesMateria.length - 1].fechaFin = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);
            if (division.fechaProxClase != null)
            {
              let fechaProxClase = division.fechaProxClase.split('-');
              this.divisionesMateria[this.divisionesMateria.length - 1].fechaProxClase = new Date(fechaProxClase[0], fechaProxClase[1] - 1, fechaProxClase[2]);
            }
            else
              this.divisionesMateria[this.divisionesMateria.length - 1].fechaProxClase = null;
          });
        }

        console.log(this.divisionesMateria);

        this.cargando.dismiss();
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarDivisionesMateria(); console.log(error)});
  }

  ReintentarCargarDivisionesMateria()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de divisiones de la materia?',
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
            this.ObtenerDivisionesMateria();
          }
        }
      ]
    });
    confirm.present();
  }
  
  /**
  * Carga las divisiones del aula. Luego se hara con la base de datos.
  */
  ObtenerDivisionesAula()
  {
    // this.divisionesAula = new Array<Division>();

    // this.divisionesAula.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "database.png"),
    //                                   new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
    //                                   "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
    //                                   ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    // this.divisionesAula.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "matematica.png"),
    //                                   new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
    //                                   "5-A", new Ciclo(1, 2017, 1), "Mañana",new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00", 
    //                                   ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    // this.divisionesAula.push(new Division(2, new Aula(1, "104", 1), new Materia(3, "Programacion II", "html.png"),
    //                                   new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
    //                                   "4-A", new Ciclo(1, 2016, 2), "Mañana",new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00", 
    //                                   ["Lunes"], "Terminada", 18, 9, 15, 15, null));
  
    this.divisionesAula = new Array<Division>();

    this.MostrarLoading("divisiones del aula");

    this.ws.TraerDivisionesDelAula(this.aula.idAula).then(
      (data) => {
        console.log(data);
        
        if (data.Exito)
        {
          data.Divisiones.forEach(division => {

            this.divisionesAula.push(division);
            this.divisionesAula[this.divisionesAula.length - 1].materia = new Materia(division.idMateria, division.nombreMateria, division.img);
            this.divisionesAula[this.divisionesAula.length - 1].aula = this.aula;
            this.divisionesAula[this.divisionesAula.length - 1].ciclo = new Ciclo(division.idCiclo, division.anio, division.cuatrimestre);
            this.divisionesAula[this.divisionesAula.length - 1].dias = [division.dia1, division.dia2, division.dia3];
            let fechaInicio = division.fechaInicio.split('-');
            this.divisionesAula[this.divisionesAula.length - 1].fechaInicio = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
            let fechaFin = division.fechaFin.split('-');
            this.divisionesAula[this.divisionesAula.length - 1].fechaFin = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);
            if (division.fechaProxClase != null)
            {
              let fechaProxClase = division.fechaProxClase.split('-');
              this.divisionesAula[this.divisionesAula.length - 1].fechaProxClase = new Date(fechaProxClase[0], fechaProxClase[1] - 1, fechaProxClase[2]);
            }
            else
              this.divisionesAula[this.divisionesAula.length - 1].fechaProxClase = null;
          });
        }

        console.log(this.divisionesAula);

        this.cargando.dismiss();
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarDivisionesAula(); console.log(error)});
  }

  ReintentarCargarDivisionesAula()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de divisiones del aula?',
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
            this.ObtenerDivisionesAula();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
  * Carga los alumnos de la division. Luego se hara con la base de datos.
  */
  ObtenerAlumnosDivision()
  {
    // this.alumnosDivision = new Array();

    // this.alumnosDivision.push({alumno : this.alumnos[0], estado: "Cursando", faltas: 2});
    // this.alumnosDivision.push({alumno : this.alumnos[1], estado: "Libre", faltas: 10});
    // this.alumnosDivision.push({alumno : this.alumnos[2], estado: "Abandono", faltas: 1});

    this.MostrarLoading("alumnos de la division")

    this.ws.TraerAlumnosDivision(this.division.idDivision).then((data) => {

      this.cargando.dismiss();
      console.log(data);

      if (data.Exito)
      {
        this.alumnosDivision = new Array<{alumno : any, faltas : any, estado : any}>();

        for (var i = 0; i < data.Alumnos.length; i++) {
          this.alumnosDivision.push({ alumno : data.Alumnos[i], faltas : data.Alumnos[i].faltas, estado : data.Alumnos[i].estado });
        }

        console.log(this.alumnosDivision);
      }
    })
    .catch((error) => {

      this.cargando.dismiss();
      this.ReintentarObtenerAlumnosDivision();
      console.log(error);

    });
  }

  ReintentarObtenerAlumnosDivision()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de alumnos de la division?',
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
            this.ObtenerAlumnosDivision();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
  * Evento Click de la lista desplegable de divisiones.
  * Si la lista se esta mostrando, la vuelve a contraer. Viceversa en caso contrario.
  * @param grupo Lista desplegable que ejecuto el evento.
  */
  toggleGroup(grupo)
  {
    if (this.isGroupShown(grupo))
        this.shownGroup[grupo] = null;
    else
        this.shownGroup[grupo] = true;
  }

  /**
  * Verifica si se esta mostrando la lista desplegable.
  * @param grupo Lista desplegable a revisar.
  */
  isGroupShown(grupo) 
  {
    return this.shownGroup[grupo] === true;
  }

  /** 
  * Filtrado de la lista de divisiones que cursa un alumno de acuerdo al criterio pasado.
  * @param criterio criterio a mostrar ('Cursando', 'Terminada', 'Abandonada', 'Libre','No empezada').
  */
  filtrarDivisionesAlumno(criterio : string)
  {
    if (criterio == "Cursando")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Cursando'; });
    else if (criterio == "Terminada")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Terminada'; });
    else if (criterio == "Abandonada")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Abandonada'; });
    else if (criterio == "No empezada")
      return this.divisionesUsuario.filter((item) => { return item.estado == 'No empezada'; });
    else
      return this.divisionesUsuario.filter((item) => { return item.estado == 'Libre'; });
  }

  /** 
  * Filtrado de la lista de divisiones que da clases un profesor de acuerdo al criterio pasado.
  * @param criterio criterio a mostrar ('En curso', 'Terminada', 'No empezada').
  */
  filtrarDivisionesProfesor(criterio : string)
  {
      return this.divisionesUsuario.filter((item) => { return item.estado == criterio; });
  }

  /**
  * Convierte la fecha en formato Date en una cadena (DD/MM/YYYY).
  * @param date fecha a convertir
  */
  ObtenerFecha(date : Date)
  {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

}

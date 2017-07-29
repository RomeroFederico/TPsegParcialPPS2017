import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DatosAdministradorPage } from '../datos-administrador/datos-administrador';
import { HomeAdministradorPage } from '../home-administrador/home-administrador';

import { Usuario } from '../../components/clases/usuario';
//import { Administrador } from '../../components/clases/administrador';
import { Administrativo } from '../../components/clases/administrativo';
import { Profesor } from '../../components/clases/profesor';
import { Alumno } from '../../components/clases/alumno';

import { Division } from '../../components/clases/division';
import { Ciclo } from '../../components/clases/ciclo';
import { Aula } from '../../components/clases/aula';
import { Materia } from '../../components/clases/materia';

import { Ws } from '../../providers/ws';

import { AppState } from '../../app/app.global';

@Component({
  selector: 'page-listado-administrador',
  templateUrl: 'listado-administrador.html',
  providers: [Ws],
})
export class ListadoAdministradorPage {

  tema : any = null;
  bug : boolean = null;

  opciones: any;

  usuariosBase: Array<Usuario>;
  usuarios: Array<Usuario>;

  ciclos: Array<Ciclo>;

  materias: Array<Materia>;
  materiasBase: Array<Materia>;

  divisionesBase: Array<Division>;
  divisiones: Array<Division>;

  aulasBase: Array<Aula>;
  aulas: Array<Aula>;

  filtro: string = "Todos";
  buscar: string;

  eventoFiltrar: any;

  cargando : any = null;

  constructor(public navCtrl : NavController, public navParams : NavParams, public ws : Ws,
              public loadingController : LoadingController, public alertCtrl: AlertController, public global: AppState, private storage: Storage, public events : Events)
  {
    this.opciones = this.navParams.get("opciones");
    console.log(this.opciones);

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

    if (this.opciones.tipo == "Usuario") {
      this.CargarUsuarios();
      //this.InicializarListadoUsuarios();
      this.buscar = "Apellido";
    }
    else if (this.opciones.tipo == "Division") {
      //this.CargarCiclos();
      this.CargarDivisiones();
      //this.InicializarListadoDivisiones();
      this.buscar = "Materia";
    }
    else if (this.opciones.tipo == "Materia") {
      this.CargarMaterias();
      //this.InicializarListadoMaterias();
      this.buscar = "Nombre";
    }
    else if (this.opciones.tipo == "Aula") {
      this.CargarAulas();
      //this.InicializarListadoAulas();
      this.buscar = "Nombre";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoAdministradorPage');
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
  * Volver a la pagina principal.
  */
  Volver() {
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

  /**
  * Muestra el usuario seleccionado, en la pagina DatosAdministradorPage.
  * @param usuario usuario a mostrar.
  */
  MostrarDatosUsuario(usuario: Usuario) {
    this.navCtrl.push(DatosAdministradorPage, { tipo: 'Usuario', usuario: usuario });
  }

  /**
  * Muestra el usuario seleccionado, en la pagina DatosAdministradorPage.
  * @param usuario usuario a mostrar.
  */
  MostrarDatosDivision(division: Division) {
    this.navCtrl.push(DatosAdministradorPage, { tipo: 'Division', division: division });
  }

  /**
  * Muestra la materia seleccionada, en la pagina DatosAdministradorPage.
  * @param materia materia a mostrar.
  */
  MostrarDatosMateria(materia: Materia) {
    this.navCtrl.push(DatosAdministradorPage, { tipo: 'Materia', materia: materia });
  }

  /**
  * Muestra el aula seleccionada, en la pagina DatosAdministradorPage.
  * @param aulña aula a mostrar.
  */
  MostrarDatosAula(aula: Aula) {
    this.navCtrl.push(DatosAdministradorPage, { tipo: 'Aula', aula: aula });
  }

  /**
  * Carga los usuarios. Luego se hara con la base de datos.
  */
  CargarUsuarios() {
    // this.usuariosBase = new Array<Usuario>();

    // this.usuariosBase.push(new Administrativo(1, "uno", "UNO", "123", "1001", "a@a.com", "123456", 21, "default.png", "Masculino"));
    // this.usuariosBase.push(new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png", "Masculino"));
    // this.usuariosBase.push(new Alumno(3, "tres", "TRES", "789", "1003", "c@c.com", "811124", 18, "default.png", "Masculino"));
    this.usuariosBase = new Array<Usuario>();

    this.MostrarLoading("usuarios");

    this.ws.TraerUsuarios().then(
      (value) => {
        console.log(value);
        value.forEach(obj => {

          var usuario : Usuario;

          if (obj.tipo == "Alumno")
            usuario = new Alumno(obj.idUsuario, obj.nombre, obj.apellido, obj. dni, obj.legajo, obj.email, obj.password, obj.edad, obj.img, obj.sexo);
          else if (obj.tipo == "Profesor")
            usuario = new Profesor(obj.idUsuario, obj.nombre, obj.apellido, obj. dni, obj.legajo, obj.email, obj.password, obj.edad, obj.img, obj.sexo);
          else
            usuario = new Administrativo(obj.idUsuario, obj.nombre, obj.apellido, obj. dni, obj.legajo, obj.email, obj.password, obj.edad, obj.img, obj.sexo);

          this.usuariosBase.push(usuario);
        });

        this.cargando.dismiss();
        this.InicializarListadoUsuarios();
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarUsuarios(); console.log(error)});
  }

  ReintentarCargarUsuarios()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de usuarios?',
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
            this.CargarUsuarios();
          }
        }
      ]
    });
    confirm.present();
  }

  /*
  * Carga los ciclos lectivos de la facultad. Luego se hara con la base de datos.
  */
  CargarCiclos() {
    // this.ciclos = new Array<Ciclo>();
    // this.ciclos.push(new Ciclo(1, 2017, 1));
    // this.ciclos.push(new Ciclo(2, 2016, 2));
    // this.ciclos.push(new Ciclo(3, 2016, 1));

    console.log("Cargando ciclos...");

    this.ws.TraerCiclos().then((data) => {

      this.cargando.dismiss();

      this.ciclos = new Array<Ciclo>();

      data.forEach(ciclo => {
        this.ciclos.push(new Ciclo(ciclo.idCiclo, ciclo.anio, ciclo.cuatrimestre));
      });

      this.InicializarListadoDivisiones();

      console.log(this.ciclos);

    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarCiclos(); console.log(error); })
  }

  ReintentarCargarCiclos()
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
            this.MostrarLoading("divisiones");
            this.CargarCiclos();
          }
        }
      ]
    });
    confirm.present();
  }

  /*
  * Carga las materias de la facultad. Luego se hara con la base de datos.
  */
  CargarMaterias() {
    // this.materiasBase = new Array<Materia>();

    // this.materiasBase.push(new Materia(1, "Matematica II", "matematica.png"));
    // this.materiasBase.push(new Materia(2, "Programacion III", "html.png"));
    // this.materiasBase.push(new Materia(3, "Arquitectura y Diseño de Bases de Datos", "database.png"));

    this.MostrarLoading("materias")

    this.ws.TraerMaterias().then((data) => {

      this.cargando.dismiss();

      this.materiasBase = data;

      this.InicializarListadoMaterias();

    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarMaterias(); console.log(error); })
  }

  ReintentarCargarMaterias()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de materias?',
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
            this.CargarMaterias();
          }
        }
      ]
    });
    confirm.present();
  }

  /*
  * Carga las aulas de la facultad. Luego se hara con la base de datos.
  */
  CargarAulas() {
    // this.aulasBase = new Array<Aula>();

    // this.aulasBase.push(new Aula(1, "103", 1));
    // this.aulasBase.push(new Aula(2, "203", 2));
    // this.aulasBase.push(new Aula(3, "LAB 5", 3));
    // this.aulasBase.push(new Aula(4, "003", 0));

    this.MostrarLoading("aulas")

    this.ws.TraerAulas().then((data) => {

      this.cargando.dismiss();

      this.aulasBase = data;

      this.InicializarListadoAulas();

    })
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarAulas(); console.log(error); })
  }

  ReintentarCargarAulas()
  {
    let confirm = this.alertCtrl.create({
      title: 'Error en el servidor',
      message: 'Desea reintentar la carga de aulas?',
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
            this.CargarAulas();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
  * Carga las divisiones. Luego se hara con la base de datos.
  */
  CargarDivisiones() {
    // this.divisionesBase = new Array<Division>();

    // this.divisionesBase.push(new Division(1, new Aula(1, "103", 1), new Materia(1, "Arquitectura y Diseño de Bases de Datos", "default.png"),
    //   new Profesor(2, "dos", "DOS", "456", "1002", "b@b.com", "789999", 35, "default.png"),
    //   "4-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00",
    //   ["Martes"], "En curso", 20, 10, 15, 5, new Date(2017, 5, 25)));
    // this.divisionesBase.push(new Division(2, new Aula(1, "103", 1), new Materia(2, "Matematica III", "default.png"),
    //   new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
    //   "5-A", new Ciclo(1, 2017, 1), "Mañana", new Date(2017, 3, 25), new Date(2017, 7, 5), "08:00",
    //   ["Miercoles", "Viernes"], "En curso", 18, 9, 15, 4, new Date(2017, 5, 28)));
    // this.divisionesBase.push(new Division(2, new Aula(1, "104", 1), new Materia(3, "Matematica II", "default.png"),
    //   new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png"),
    //   "4-A", new Ciclo(2, 2016, 2), "Mañana", new Date(2016, 9, 25), new Date(2016, 12, 5), "08:00",
    //   ["Lunes"], "Terminada", 18, 9, 15, 15, null));

    // var materias = new Array<Materia>();
    // var aulas = new Array<Aula>();
    // var profesor = new Profesor(4, "cuatro", "CUATRO", "789", "1004", "d@d.com", "aw9999", 40, "default.png");

    // materias.push(new Materia(1, "Matematica I", "default.png"));
    // materias.push(new Materia(2, "Programacion I", "java.png"));
    // materias.push(new Materia(3, "Laboratorio I", "javascript.png"));
    // materias.push(new Materia(4, "Ingles I", "xml.png"));

    // aulas.push(new Aula(1, "100-A", 3));
    // aulas.push(new Aula(2, "LAB-1", 2));

    // this.divisionesBase.push(new Division
    //   (1, aulas[0], materias[0],
    //   profesor, "1-A", new Ciclo(1, 2017, 1), "Mañana",
    //   new Date(2017, 3, 16), new Date(2017, 6, 20), "8:30 am",
    //   ["Jueves", "Martes"], "Cursando",
    //   30, 20, 16, 1, new Date(2017, 3, 17)));

    // this.divisionesBase.push(new Division
    //   (2, aulas[0], materias[3],
    //   profesor, "1-B", new Ciclo(1, 2017, 1), "Mañana",
    //   new Date(2017, 3, 16), new Date(2017, 6, 20), "8:30 am",
    //   ["Martes"], "Cursando",
    //   30, 20, 16, 1, new Date(2017, 3, 17)));

    // this.divisionesBase.push(new Division
    //   (3, aulas[1], materias[1],
    //   profesor, "1-C", new Ciclo(1, 2017, 1), "Mañana",
    //   new Date(2017, 3, 16), new Date(2017, 6, 20), "8:30 am",
    //   ["Lunes"], "Cursando",
    //   30, 20, 16, 1, new Date(2017, 3, 17)));

    // this.divisionesBase.push(new Division
    //   (4, aulas[1], materias[2],
    //   profesor, "2-A", new Ciclo(1, 2017, 1), "Mañana",
    //   new Date(2017, 3, 16), new Date(2017, 6, 20), "8:30 am",
    //   ["Miercoles"], "Cursando",
    //   30, 20, 16, 1, new Date(2017, 3, 17)));

    // this.divisionesBase.push(new Division
    //   (4, aulas[1], materias[2],
    //   profesor, "2-B", new Ciclo(1, 2017, 1), "Mañana",
    //   new Date(2017, 3, 16), new Date(2017, 6, 20), "8:30 am",
    //   ["Miercoles"], "Cursando",
    //   30, 20, 16, 1, new Date(2017, 3, 17)));

    this.divisionesBase = new Array<Division>();

    this.MostrarLoading("divisiones");

    this.ws.TraerDivisionesCompletas().then(
      (data) => {
        console.log(data);
        
        if (data.Exito)
        {
          data.Divisiones.forEach(division => {

            this.divisionesBase.push(division);
            this.divisionesBase[this.divisionesBase.length - 1].profesor = new Profesor(division.idProfesor, division.nombreProfesor, division.apellido, "", division.legajo, division.email, "", 0, division.imgProfesor, "");
            this.divisionesBase[this.divisionesBase.length - 1].materia = new Materia(division.idMateria, division.nombreMateria, division.img);
            this.divisionesBase[this.divisionesBase.length - 1].ciclo = new Ciclo(division.idCiclo, division.anio, division.cuatrimestre);
            this.divisionesBase[this.divisionesBase.length - 1].aula = new Aula(division.idAula, division.nombreAula, division.piso);
            this.divisionesBase[this.divisionesBase.length - 1].dias = [division.dia1, division.dia2, division.dia3];
            let fechaInicio = division.fechaInicio.split('-');
            this.divisionesBase[this.divisionesBase.length - 1].fechaInicio = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2]);
            let fechaFin = division.fechaFin.split('-');
            this.divisionesBase[this.divisionesBase.length - 1].fechaFin = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2]);
            if (division.fechaProxClase != null)
            {
              let fechaProxClase = division.fechaProxClase.split('-');
              this.divisionesBase[this.divisionesBase.length - 1].fechaProxClase = new Date(fechaProxClase[0], fechaProxClase[1] - 1, fechaProxClase[2]);
            }
            else
              this.divisionesBase[this.divisionesBase.length - 1].fechaProxClase = null;
          });

          console.log(this.divisionesBase);

          this.CargarCiclos();
        }
      }
    )
    .catch((error) => { this.cargando.dismiss(); this.ReintentarCargarDivisiones(); console.log(error)});
  }

  ReintentarCargarDivisiones()
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
            this.CargarDivisiones();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
  * Inicializa el listado de acuerdo al filtro seleccionado (Todos, Alumnos, Profesor, Administrativo).
  */
  InicializarListadoUsuarios() {
    if (this.filtro == "Todos")
      this.usuarios = this.usuariosBase;
    else {
      this.usuarios = this.usuariosBase.filter((item) => {
        if (this.filtro == "Alumno")
          return (item instanceof Alumno);
        else if (this.filtro == "Profesor")
          return (item instanceof Profesor);
        else
          return (item instanceof Administrativo);
      })
    }
  }

  /**
  * Inicializa el listado de acuerdo al filtro seleccionado (Todos, por ciclo).
  */
  InicializarListadoDivisiones() {
    if (this.filtro == "Todos")
      this.divisiones = this.divisionesBase;
    else {
      this.divisiones = this.divisionesBase.filter((item) => {
        return (item.ciclo.CicloEnCadena == this.filtro);
      })
    }
  }

  /**
  * Inicializa el listado de materias.
  */
  InicializarListadoMaterias() {
    this.materias = this.materiasBase;
  }

  /**
  * Inicializa el listado de aulas.
  */
  InicializarListadoAulas() {
    if (this.filtro == "Todos")
      this.aulas = this.aulasBase;
    else {
      this.aulas = this.aulasBase.filter((item) => {
        if (this.filtro == "PlantaBaja")
          return (item.piso == 0);
        else if (this.filtro == "PisoUno")
          return (item.piso == 1);
        else if (this.filtro == "PisoDos")
          return (item.piso == 2);
        else
          return (item.piso == 3);
      })
    }
  }

  /**
  * Devuelve el tipo de usuario en formato de cadena.
  * @param usuario usuario del sistema.
  */
  DevolverTipo(usuario: Usuario) {
    if (usuario instanceof Administrativo)
      return "Administrativo";
    else if (usuario instanceof Profesor)
      return "Profesor";
    else
      return "Alumno";
  }

  /**
  * Funcion utilizada para el buscador. Permite filtrar el listado de acuerdo al string ingresado y el filtro utilizado.
  * @param ev evento ionInput del buscador.
  */
  getItems(ev: any) {

    this.eventoFiltrar = ev;

    // Resetea el listado al valor inicial, aplicando el filtro.
    if (this.opciones.tipo == "Usuario")
      this.InicializarListadoUsuarios();
    else if (this.opciones.tipo == "Division")
      this.InicializarListadoDivisiones();
    else if (this.opciones.tipo == "Materia")
      this.InicializarListadoMaterias();
    else if (this.opciones.tipo == "Aula")
      this.InicializarListadoAulas();

    // Ajusto val al valor ingresado en el buscador.
    let val = ev.target.value;

    // Si el valor ingresado esta vacio no realizo la busqueda.
    if (val && val.trim() != '') {
      if (this.opciones.tipo == "Usuario") {
        this.usuarios = this.usuarios.filter((item) => {
          if (this.buscar == "Apellido")
            return (item.apellido.toLowerCase().indexOf(val.toLowerCase()) > -1);
          else if (this.buscar == "Nombre")
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          else
            return (item.legajo.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else if (this.opciones.tipo == "Division") {
        this.divisiones = this.divisiones.filter((item) => {
          if (this.buscar == "Materia")
            return (item.materia.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          else
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else if (this.opciones.tipo == "Materia") {
        this.materias = this.materias.filter((item) => {
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else if (this.opciones.tipo == "Aula") {
        this.aulas = this.aulas.filter((item) => {
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
  }

  /**
  * Evento onChange del select que contiene el filtro de busqueda por apellido, nombre o legajo.
  * Ejecuta la funcion getItems, actualizando el listado con el nuevo filtro de busqueda.
  * Si no se ejecuto nunca la funcion getItems, no se hara nada.
  */
  onChangeBuscar() {
    if (this.eventoFiltrar != null)
      this.getItems(this.eventoFiltrar);
  }

  /**
  * Evento onChange del select que contiene el filtro por tipo de usuario.
  * Ejecuta la funcion getItems, actualizando el listado con los valores validos.
  * Si no se ejecuto nunca la funcion getItems, no se hara nada.
  */
  onChangeFiltro() {
    this.onChangeBuscar();

    if (this.eventoFiltrar == null) {
      if (this.opciones.tipo == "Usuario")
        this.InicializarListadoUsuarios();
      else if (this.opciones.tipo == "Division")
        this.InicializarListadoDivisiones();
      else if (this.opciones.tipo == "Aula")
        this.InicializarListadoAulas();
    }
  }

}

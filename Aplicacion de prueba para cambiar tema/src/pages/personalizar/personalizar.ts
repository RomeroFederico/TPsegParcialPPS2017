import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController, PopoverController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ModalTemaPage } from '../modal-tema/modal-tema';

import { AppState } from '../../app/app.global';

@Component({
  selector: 'page-personalizar',
  templateUrl: 'personalizar.html',
})
export class PersonalizarPage {

  tema : any = { colorPrincipal : "#222", colorSecundario : "#616161", colorFondo : "lightgray", 
                 fuente : "Gill Sans, Trebuchet MS, sans-serif", fuenteSize : "medium", fuenteColor : "black", fuenteCursiva : false };

  miTema : any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public global: AppState, private storage: Storage, public events : Events)
  {
    this.miTema = this.navParams.get("conTemaPersonalizado");

    console.log("Comprobando tema personalizado");
    console.log(this.miTema);

    if (this.miTema != null)
    {
      this.ComprobarTemaPersonalizado();
    }
  }

  ionViewDidLoad() {
  }

  Aceptar()
  {
    console.log(this.tema);
    this.global.set('theme', "");
    this.storage.remove("Tema").then(()=>{
      this.storage.set("Tema", this.tema).then(()=>{
        this.events.publish('TemaSeteado');
        this.navCtrl.pop();
      })
    })
  }

  Cancelar()
  {
    this.navCtrl.pop();
  }

  mostrarModal(myEvent, opcion)
  {
    console.log("Modal");
    let popover = this.popoverCtrl.create(ModalTemaPage, {opcion : opcion});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((popoverData) => {
      if (popoverData != null && popoverData.exito)
      {
        if (opcion == 1)
          this.tema.colorPrincipal = popoverData.color.codigo;
        else if (opcion == 2)
          this.tema.colorSecundario = popoverData.color.codigo;
        else if (opcion == 3)
          this.tema.colorFondo = popoverData.color.codigo;
        else if (opcion == 4)
          this.tema.fuente = popoverData.fuente.todo;
        else if (opcion == 5)
          this.tema.fuenteSize = popoverData.size.todo;
        else if (opcion == 6)
          this.tema.fuenteColor = popoverData.colorFuente.todo;
        else
          this.tema.fuenteCursiva = popoverData.cursiva;
      }
    })
  }

  ComprobarTemaPersonalizado()
  {
    this.storage.get('Tema').then(datos => {
      this.miTema = datos;
      this.CrearTemaDinamico();
    })
    .catch(err=>
    {
      this.miTema = null;
    });
  }

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
      div.setAttribute("style", "color : " + this.miTema.fuenteColor +  "; border-radius: 10px; background-color: gray; font-size: medium; padding-left: 10px; opacity: 0.7; text-align: right; padding-right: 10px;margin: 0px 0px 0px 0px;");
    }
    
    for(var i=0; i< document.getElementsByClassName('atributo').length; i++)
    {
      var div : Element = document.getElementsByClassName('atributo')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `color : white;
        border-radius: 10px;
        background-color: ` + this.miTema.colorSecundario + `;
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
        background-color: ` + this.miTema.colorSecundario + `;
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
        background-color: ` + this.miTema.colorPrincipal + `;`);
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
      div.setAttribute("style", `color: ` + this.miTema.colorPrincipal + `;`);
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
          input.setAttribute("style", `background-color : ` + this.miTema.colorPrincipal +`;`);

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
        header.setAttribute("style", `background-color : ` + this.miTema.colorPrincipal +`;`);

        for (var m=0; m< header.getElementsByTagName('div').length; m++)
        {
          var div : Element = header.getElementsByTagName('div')[m];

          for (var k=0; k< div.getElementsByClassName('input-wrapper').length; k++)
          {
            var input : Element = div.getElementsByClassName('input-wrapper')[k];

            input.setAttribute("style", ``);
            input.setAttribute("style", `background-color : ` + this.miTema.colorPrincipal +`;`);

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
      div.setAttribute("style", `font-family: ` + this.miTema.fuente + `;
      font-style: ` + (this.miTema.fuenteCursiva == true? 'italic' : 'normal' ) + `;
      font-size: ` + this.miTema.fuenteSize + `;
      color: ` + this.miTema.fuenteColor + `;
      background-color: ` + this.miTema.colorFondo + `;`);
    }

    for(var i=0; i< document.getElementsByTagName('ion-navbar').length; i++)
    {
      var div : Element = document.getElementsByTagName('ion-navbar')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `font-family: ` + this.miTema.fuente + `;
      font-style: ` + (this.miTema.fuenteCursiva == true? 'italic' : 'normal' ) + `;
      font-size: ` + this.miTema.fuenteSize + `;
      color: ` + this.miTema.fuenteColor + `;`);
    }

    for(var i=0; i< document.getElementsByClassName('toolbar-background').length; i++)
    {
      var div : Element = document.getElementsByClassName('toolbar-background')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
      background-color: `+ this.miTema.colorPrincipal +`;`);
    }

    for(var i=0; i< document.getElementsByClassName('toggle-checked').length; i++)
    {
      var div : Element = document.getElementsByClassName('toggle-checked')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `transition: all 1.1s ease;
      background-color: `+ this.miTema.colorPrincipal +`;`);
    }

    for(var i=0; i< document.getElementsByClassName('item-inner').length; i++)
    {
      var div : Element = document.getElementsByClassName('item-inner')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `background-color: `+ this.miTema.colorFondo +`;`);
    }

    for(var i=0; i< document.getElementsByClassName('bug').length; i++)
    {
      var div : Element = document.getElementsByClassName('bug')[i];
      div.setAttribute("style", ``);
      div.setAttribute("style", `height: 50px;`);
    }
  }

}

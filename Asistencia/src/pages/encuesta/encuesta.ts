import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Alumno } from '../../components/clases/alumno';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';//FIREBASE!

@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class Encuesta {
  listaEstrellas: any;
  textArea = "";
  cantEstrellas1 = -1;
  cantEstrellas2 = -1;
  encuestaCompleta = false;
  listaEncuestas: any;
  alumno:Alumno = new Alumno();
  listado : FirebaseListObservable<any[]>;//FIREBASE!
  listado2:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private firebase: AngularFireDatabase ) 
  {
    this.alumno = JSON.parse(localStorage.getItem("usuario"));
    this.listado=firebase.list('/Encuestas');//CARGO LA LISTA.
    this.listado.subscribe(data => {console.log("Datos de firebase: ");console.log(data);this.listado2=data;});//MUESTRO LAS DATOS DE LAS LISTAS.
    this.ReiniciarEncuesta();
    //this.CargarEncuestas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Encuesta');
  }
  CargarEncuestas()
  {
      this.listaEncuestas = new Array();
      //CARGAR LISTA DESDE FB
      
      this.listaEncuestas.push(["nombre alumno",2,3,"comentario"]);
      this.listaEncuestas.push(["nombre alumno2",0,4,"comentario2"]);
  }
  ReiniciarEncuesta()
  {
    this.ListarEstrellas();
    this.cantEstrellas1 = -1;
    this.cantEstrellas2 = -1;
    this.textArea = "";
  }
  ListarEstrellas()
  {
      this.listaEstrellas = new Array();
      for (var i = 0; i < 3; i++)
      {
          this.listaEstrellas.push([{'color':'#BDBBBA','font-size':'50px'},
          {'color':'#BDBBBA','font-size':'50px'},{'color':'#BDBBBA','font-size':'50px'},{'color':'#BDBBBA','font-size':'50px'},{'color':'#BDBBBA','font-size':'50px'}]);
      }
  }
  AlertCorrecto()
  {
    let alert = this.alertCtrl.create({
      title: 'Gracias por calificarnos!',
      buttons: ['OK']
    });
    alert.present();
  }
  ObtenerTipo()
  {
    return localStorage.getItem('tipo');
  }
  Estrellas(num1, num2)
  {
        for (var i = 0; i < 5; i++)
        {
            this.listaEstrellas[num1][i] = {'color':'#BDBBBA','font-size':'50px'};
        }
        for(let i = 0 ; i <= num2 ; i++)
        {
            this.listaEstrellas[num1][i] = {'color':'#F6AD06','font-size':'50px'};
        }
        switch(num1)
        {
          case 1:
            this.cantEstrellas1 = num2;
            break;
          case 2:
            this.cantEstrellas2 = num2;
            break;
        }
  }

  EnviarEncuesta()
  {
      if(this.cantEstrellas1 == -1 || this.cantEstrellas2 == -1)
      {
        this.encuestaCompleta = true;
        setTimeout(() =>
        {
           this.encuestaCompleta = false;
        },
        2000);
      }
      else
      {
        var obj={usuario:this.alumno.nombre+' '+this.alumno.apellido,intuitivo:this.cantEstrellas1,facilidad:this.cantEstrellas2,comentario:this.textArea};
        console.log(obj);
        this.listado.push(obj);
        this.AlertCorrecto()
        this.Volver();
      }
  }
  Volver()
  {
    this.navCtrl.pop();
  }

}

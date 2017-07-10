import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class Mapa {

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
  }
  map: any;
  directionsService;
  directionsDisplay;
  lat = -34.6625839;
lng = -58.3669364;
latlng = new google.maps.LatLng(this.lat, this.lng);
m1 = new google.maps.Marker({position: this.latlng, animation: google.maps.Animation.DROP, label: "UNT FRA"});
  ionViewDidLoad() {
    console.log('ionViewDidLoad Mapa');
    this.CargarMapa();
    this.m1.setMap(this.map);
  }
  @ViewChild('map') mapElement: ElementRef;
  Volver()
  {
    this.navCtrl.pop();
  }

  CargarMapa()
  {
    let latLng = new google.maps.LatLng(-34.6625839,-58.3669364);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      minZoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
  }

}

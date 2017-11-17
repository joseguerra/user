import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google; 

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  @ViewChild('map') mapElement
  public items: any;
  map : any;
  note: boolean = false;
  ubicacion: string ;
  usuario: string ;
  latitud: any;
  longitud: any;
  tipo_alerta: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams              
              ) { 
    this.ubicacion = this.navParams.get('ubicacion')
    this.usuario = this.navParams.get('usuario')
    this.latitud = this.navParams.get('latitud')
    this.longitud = this.navParams.get('longitud')
    this.tipo_alerta = this.navParams.get('tipo_alerta')
    
  }

  ionViewDidLoad(){
    console.log("llegue a la page de notificacion")
    this.initMap();
  }


  initMap(){

      let latLng = new google.maps.LatLng(this.latitud,this.longitud);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeID: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions)

        let LatLng = new google.maps.LatLng(this.latitud,this.longitud);
        var marker = new google.maps.Marker({
          map: this.map,
          position: LatLng,
          animation: google.maps.Animation.DROP,
          label: 'U',
          title: 'Hello World!'
        });
         
  }


}

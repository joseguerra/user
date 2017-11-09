import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Map} from './map.provider';

declare var google; 

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement
  public items: any;
  map : any;
  note: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public mapProvider: Map
              ) { 
    
    
  }

  ionViewDidLoad(){
    if(this.navParams.get('id')){
      this.get_ubicaciones(this.navParams.get('id'),this.navParams.get('start'),this.navParams.get('end'));
    }    
    else{
      this.get();               
    }
  }

  initMap(data){
    if(data.length==0){
      this.note = true;
    }
    else{
      let latLng = new google.maps.LatLng(data[0].latitud,data[0].longitud);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeID: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions)
      for(var i = 0; i<data.length;i++){
        let LatLng = new google.maps.LatLng(data[i].latitud,data[i].longitud);
        var marker = new google.maps.Marker({
          map: this.map,
          position: LatLng,
          animation: google.maps.Animation.DROP,
          label: data[i].usuario_full_name[0],
          title: 'Hello World!'
        });
      }
    }

    
    

  }

  get() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.storage.get('token').then((val) => {
      this.mapProvider.get(val).subscribe(
      data => {
        this.items = data;
        this.initMap(data)
        console.log(data);        
        loading.dismiss();
      },
      err => {        
        if(err.status == 400){          
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Combinacion incorrecta',
            buttons: ['OK']
          });
          alert.present();
        }
        else{
          loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Lo sentimos',
              subTitle: 'Pruebe mas tarde',
              buttons: ['OK']
            });
            alert.present();
        }
      }
    );
    });    
  }

  get_ubicaciones(id,inicio,fin) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.storage.get('token').then((val) => {
      this.mapProvider.get_ubicaciones(val,id,inicio,fin).subscribe(
      data => {
        this.items = data;

        this.initMap(data)
        console.log(data);        
        loading.dismiss();
      },
      err => {        
        if(err.status == 400){          
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Combinacion incorrecta',
            buttons: ['OK']
          });
          alert.present();
        }
        else{
          loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Lo sentimos',
              subTitle: 'Pruebe mas tarde',
              buttons: ['OK']
            });
            alert.present();
        }
      }
    );
    });    
  }


}

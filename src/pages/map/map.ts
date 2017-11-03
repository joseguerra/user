import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {Map} from './map.provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  public items: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public map:Map) {    
    if(navParams.get('id')){
      console.log("1")
      this.get_ubicaciones(navParams.get('id'));
    }    
    else{
      console.log("2")
      this.get();               
    }
    
  }

  get() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.storage.get('token').then((val) => {
      this.map.get(val).subscribe(
      data => {
        this.items = data;
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

  get_ubicaciones(id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.storage.get('token').then((val) => {
      this.map.get_ubicaciones(val,id).subscribe(
      data => {
        this.items = data;
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

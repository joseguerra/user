import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {List} from './list.provider';
import { Storage } from '@ionic/storage';
import {MapPage} from '../map/map';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public items: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public list:List) {

    this.get();               
  }

  get() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.storage.get('token').then((val) => {
      this.list.get(val).subscribe(
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

  map(id){
    console.log(id)
    this.navCtrl.push(MapPage, {'id':id});

  }


}

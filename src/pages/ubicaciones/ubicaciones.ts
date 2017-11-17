import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Ubicaciones} from './ubicaciones.provider';

declare var google; 

@Component({
  selector: 'page-ubicaciones',
  templateUrl: 'ubicaciones.html'
})
export class UbicacionesPage {
  @ViewChild('map') mapElement
  public items: any;
  map : any;
  note: boolean = false;
  ubication: boolean = true;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public ubicaciones: Ubicaciones
              ) { 
    
    
  }

  ionViewDidLoad(){
      this.get_ubicaciones(this.navParams.get('id'),this.navParams.get('start'),this.navParams.get('end'));
  }




  get_ubicaciones(id,inicio,fin) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.storage.get('token').then((val) => {
      this.ubicaciones.get_ubicaciones(val,id,inicio,fin).subscribe(
      data => {
        this.items = data;
        for(let i =0;i<this.items.length;i++){
          var res = this.items[i].fecha.split("T")
          var res2 = res[1].split(".")
          
          this.items[i].dia = res[0];
          this.items[i].hora = res2[0];
        }                        
        console.log(this.items);        
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

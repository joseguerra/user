import { Component } from '@angular/core';

import { NavController,LoadingController,AlertController,Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomePage } from '../home/home';
import {Login} from './login.provider'
import {BdService} from '../../app/bd';
import { Device } from '@ionic-native/device';
import {ResetPasswordPage} from '../password/reset_password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public username: string;
  public password: string;
  public onesignal_id:string = "123";
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private bdService:BdService,
              private storage: Storage,
              private device: Device,
              private events: Events,
              public login:Login             
              ) {
    storage.get('onesignal_id').then((val) => {
      this.onesignal_id = val;
      console.log('Your onesignal_id is', val);
    });
      

  }
  reset_pass() {
    this.navCtrl.push(ResetPasswordPage);
  }
  home(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.login.login(this.username,this.password,this.onesignal_id).subscribe(
      data => {
        
        console.log(data)        
        if(this.device.platform){
          this.create(data.token);
          this.createMenu(data.group);
        }
        this.storage.set('token', data.token);
        this.storage.set('perfil_id', data.perfil_id);
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
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
  }

  create(token){    
      this.bdService.create(token).then((data)=>{
        console.log(data)
      }) 
  }

  createMenu(menu){    
      this.bdService.createMenu(menu).then((data)=>{
        console.log(data)
        this.events.publish('group:changed', data.group);
      }) 
  }

}

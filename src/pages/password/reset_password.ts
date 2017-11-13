import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import {Login} from '../login/login.provider'
import { Storage } from '@ionic/storage';
import {ResetPasswordPageTwo} from './reset_password_two';
import {HomePage} from '../home/home';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-rest-password',
  templateUrl: 'reset_password.html'
})
export class ResetPasswordPage {
  public correo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public login:Login,
    private storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

  }
  send(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    if (this.correo == ""){
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'ingrese un correo válido',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    this.storage.set("email", this.correo);
    this.navCtrl.setRoot(ResetPasswordPageTwo);
    loading.dismiss();
    /*
    this.login.reset_password_one(this.correo).subscribe(
      data => {
        loading.dismiss();
        console.log(data);
        this.navCtrl.setRoot(ResetPasswordPageTwo);
        this.storage.set("email", this.correo);
        ///////////////////////////////////////////
        // if (data[0].success){
        //   this.navCtrl.setRoot(ResetPasswordPageTwo);
        // }
        // else{
        //   let alert = this.alertCtrl.create({
        //     title: 'Error',
        //     subTitle: 'Correo o usuario incorrecto',
        //     buttons: [{
        //       text:'OK',
        //       // handler: () => {
        //         // this.navCtrl.setRoot(LoginPage);
        //       // }
        //     }]
        //   });
        //   alert.present();
        // }
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
    );*/
  }
}

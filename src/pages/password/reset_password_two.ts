import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import {Login} from '../login/login.provider'
import {LoginPage} from '../login/login'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class ResetPasswordPageTwo {
  public token: string;
  public password: string;
  public passwprd_repeat: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public login:Login,
    private storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
  }
  send(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    if (this.password_repeat != this.password){
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    this.login.reset_password_two(this.token, this.password).subscribe(
      data => {
        loading.dismiss();
        if (data.success){
          this.navCtrl.setRoot(LoginPage);
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Correo o usuario incorrecto',
            buttons: [{
              text:'OK',
              handler: () => {
                this.navCtrl.setRoot(LoginPage);
              }
            }]
          });
          alert.present();
        }
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
}

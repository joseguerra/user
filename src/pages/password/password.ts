import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import {Login} from '../login/login.provider'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class PasswordPage {
  public old_password: string;
  public new_password: string;
  public new_password_repit: string;
  public username: string;
  public token: string;

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
    this.storage.get('username').then((val) => {
      this.username = val;
      this.storage.get('token').then((val)=>{
        this.token=val;
        loading.dismiss();
      });
    });
  }
  change(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    if (this.new_password_repit != this.new_password){
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: this.token,
      buttons: ['OK']
    });
    this.login.change_password(this.username,this.old_password,this.new_password, this.token).subscribe(
      data => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Las contraseñas no coinciden',
          buttons: [{
            text:'OK',
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
        }]
        });
        alert.present();
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

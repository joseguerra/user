import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import { TermsPage } from '../pages/terms/terms';


import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import {BdService} from './bd';

@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ""

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private oneSignal: OneSignal,
              private device: Device,
              private bdService:BdService,
              private storage: Storage,
              private sqlite: SQLite,
              public alertCtrl: AlertController,
              ) {
    this.initializeApp();
        storage.get('prueba').then((val) => {
          if(val == 0){
            this.pages = [
              { title: 'Home', component: HomePage, icon: "ios-home-outline" },
              { title: 'Terminos y condiciones', component: TermsPage, icon: "ios-list-box-outline" }
            ];
          }
          else{
            this.pages = [
              { title: 'Home', component: HomePage, icon: "ios-home-outline" },             
            ];
          }
        });

    

    // used for an example of ngFor and navigation
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.device.platform){
        this.oneSignal.startInit('84d86d4d-5c55-4653-9ff5-3eafd056cdd4', '1022113476844');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe((data) => {
          console.log(data)
          console.log("notificacion recibida")
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          console.log("notificacion abierta")
        });

        this.oneSignal.endInit();
        
        this.oneSignal.getIds().then((data)=>{
          this.storage.set('onesignal_id', data.userId);  
        })

         this.createDatabase();
      }


      else{
        console.log("entre aqui")
        this.rootPage = LoginPage;
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this.bdService.setDatabase(db);
      return this.bdService.createTable();
    }).then(()=>{
      this.splashScreen.hide();
      let row: number =this.bdService.select() 
      console.log(row)
      if(row == 0){
        console.log("entre aqui 2")
        this.rootPage = LoginPage;
      }
      else{
        console.log("entre aqui 3")
        this.rootPage = HomePage;
      }                  
    })
    .catch(error =>{
      console.error(error);
    });
  }

  private delete(){
    this.storage.get('token').then((val) => {
      this.bdService.delete(val) 
    });
    
  }

  close() {

    let alert = this.alertCtrl.create({
      title: 'Desea cerrar sesión ? ',
      buttons: [
        {
          text: 'Cerrar',
          handler: data => {
            this.delete();
            this.nav.setRoot(LoginPage);
          }
        },
        {
          text: 'Cancelar',
          handler: data => {
          }
        }
      ]
    });

    alert.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

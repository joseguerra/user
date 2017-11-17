import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController,NavController,Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import { TermsPage } from '../pages/terms/terms';
import {ListPage} from '../pages/list/list';
import {MapPage} from '../pages/map/map';
import {PasswordPage} from '../pages/password/password';

import {Login} from '../pages/login/login.provider'
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import {BdService} from './bd';
import {NotificationPage} from '../pages/notification/notification';

@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(NavController) navController: NavController;

  rootPage: any = ""
  group: string;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,              
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private oneSignal: OneSignal,
              private device: Device,
              private bdService:BdService,
              private storage: Storage,
              private sqlite: SQLite,
              public login:Login,
              public events: Events,
              public alertCtrl: AlertController,
              ) {
    this.initializeApp();
    this.createDatabaseMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.device.platform){
        console.log("aqui si puedo entrar")
        this.oneSignal.startInit('84d86d4d-5c55-4653-9ff5-3eafd056cdd4', '1022113476844');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);        

        this.oneSignal.handleNotificationOpened().subscribe((data) => {                   
          console.log(data);
          this.nav.setRoot(NotificationPage, {'ubicacion':data.notification.payload.additionalData.ubicacion,
                                      'usuario':data.notification.payload.additionalData.usuario,
                                      'latitud':data.notification.payload.additionalData.latitud,
                                      'longitud':data.notification.payload.additionalData.longitud,
                                      'tipo_alerta':data.notification.payload.additionalData.tipo_alerta});          
        });

        this.oneSignal.endInit();

        this.oneSignal.getIds().then((data)=>{
          this.storage.set('onesignal_id', data.userId);
        })

         this.createDatabase();
      }


      else{
        console.log("aqui no puedo entrar")
        this.storage.get('token').then((val) => {          
          if(val){
            this.rootPage = HomePage;
          }
          else{
            this.rootPage = LoginPage;
          }
        });        
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
      this.bdService.select().then(tasks => {
        console.log(tasks)
        if(tasks.length == 0){
          console.log("entre aqui 2")
          this.rootPage = LoginPage;
        }
        else{
          console.log("entre aqui 3")
          this.rootPage = HomePage;
        }
      })
      .catch( error => {
        console.error( error );
      });

    })
    .catch(error =>{
      console.error(error);
    });
  }


  private createDatabaseMenu(){
    if(this.device.platform){
      this.sqlite.create({
        name: 'data.db',
        location: 'default' // the location field is required
      })
      .then((db) => {
        this.bdService.setDatabase(db);
        return this.bdService.createTableMenu();
      }).then(()=>{
        this.splashScreen.hide();

        this.events.subscribe('group:changed', group => {
          try{
            this.bdService.selectMenu().then(menu => {
            console.log(menu)
            console.log("parte del menu")
            if(menu[0].menu == "Cliente"){  
              console.log("entre en cliente ")        
              this.pages = [
                  { title: 'Home', component: HomePage, icon: "ios-home-outline" },
                  { title: 'Terminos y condiciones', component: TermsPage, icon: "ios-list-box-outline" },
                  { title: 'Cambiar contraseña', component: PasswordPage, icon: "ios-list-box-outline" },
                ];
            }
            else{
              console.log("entre en jefe ")        
              this.pages = [
                  { title: 'Home', component: HomePage, icon: "ios-home-outline" },
                  { title: 'Lista de usuarios', component: ListPage, icon: "ios-people-outline" },
                  { title: 'Ubicación', component: MapPage, icon: "ios-navigate-outline" },
                  { title: 'Terminos y condiciones', component: TermsPage, icon: "ios-list-box-outline" },
                  { title: 'Cambiar contraseña', component: PasswordPage, icon: "ios-list-box-outline" }              
                ];
            }
          })
          .catch( error => {
            console.error( error );
          });

          }catch(e){console.log(e)}

        }) //...
          try{
            this.bdService.selectMenu().then(menu => {
              console.log(menu)
              console.log("parte del menu")
              if(menu[0].menu == "Cliente"){  
                console.log("entre en cliente ")        
                this.pages = [
                    { title: 'Home', component: HomePage, icon: "ios-home-outline" },
                    { title: 'Terminos y condiciones', component: TermsPage, icon: "ios-list-box-outline" },
                    { title: 'Cambiar contraseña', component: PasswordPage, icon: "ios-list-box-outline" },
                  ];
              }
              else{
                console.log("entre en jefe ")        
                this.pages = [
                    { title: 'Home', component: HomePage, icon: "ios-home-outline" },
                    { title: 'Lista de usuarios', component: ListPage, icon: "ios-people-outline" },
                    { title: 'Ubicación', component: MapPage, icon: "ios-navigate-outline" },
                    { title: 'Terminos y condiciones', component: TermsPage, icon: "ios-list-box-outline" },
                    { title: 'Cambiar contraseña', component: PasswordPage, icon: "ios-list-box-outline" }              
                  ];
              }
            })
            .catch( error => {
              console.error( error );
            });
            }catch(e){
              console.log(e)
            }


      })
      .catch(error =>{
        console.error(error);
      });
    }
    else{
      this.pages = [
        { title: 'Home', component: HomePage, icon: "ios-home-outline" },
        { title: 'Lista de usuarios', component: ListPage, icon: "ios-people-outline" },
        { title: 'Ubicación', component: MapPage, icon: "ios-navigate-outline" },
        { title: 'Terminos y condiciones', component: TermsPage, icon: "ios-list-box-outline" },
        { title: 'Cambiar contraseña', component: PasswordPage, icon: "ios-list-box-outline" }              
      ];
    }
  }


  private delete(){    
    this.bdService.delete();  
    this.bdService.deleteMenu();      
  }

  close() {

    let alert = this.alertCtrl.create({
      title: 'Desea cerrar sesión ? ',
      buttons: [
        {
          text: 'Cerrar',
          handler: data => {

            this.storage.get('token').then((val) => {
              this.login.logout(val).subscribe(
                data => {
                  console.log(data);
                  if(this.device.platform){
                    this.delete();
                  }
                  this.storage.set('token', 0);
                  this.nav.setRoot(LoginPage);
                },
                err => {
                  console.error(err);
                  let alerta = this.alertCtrl.create({
                    title: 'Error al cerrar sesión',
                    buttons: [
                      {
                        text: 'OK',
                        handler: data => {
                        }
                      }
                    ]
                  });

                  alerta.present();
                }
              );
            });
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

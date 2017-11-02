import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TermsPage } from '../pages/terms/terms';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { SMS } from '@ionic-native/sms';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Device } from '@ionic-native/device';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
/*Providers*/

import {Rutas} from './rute';
import {BdService} from './bd';
import {Login} from '../pages/login/login.provider'; 
import {Terms} from '../pages/terms/terms.provider';
import {Home} from '../pages/home/home.provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TermsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TermsPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    SMS,
    BackgroundGeolocation, 
    Device,
    SQLite,
    Login,
    Rutas,
    BdService,
    Terms,
    Home,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

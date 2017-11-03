import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TermsPage } from '../pages/terms/terms';
import { LoginPage } from '../pages/login/login';
import {ListPage} from '../pages/list/list';
import {MapPage} from '../pages/map/map';

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
import {List} from '../pages/list/list.provider';
import {Map} from '../pages/map/map.provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TermsPage,
    LoginPage,
    ListPage,
    MapPage
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
    ListPage,
    MapPage
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
    List,
    Map,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

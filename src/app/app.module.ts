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
import {DatePage} from '../pages/date/date';
import {UbicacionesPage} from '../pages/ubicaciones/ubicaciones'; 
import { PasswordPage} from '../pages/password/password';
import { ResetPasswordPage } from '../pages/password/reset_password';
import { ResetPasswordPageTwo } from '../pages/password/reset_password_two';
import {NotificationPage} from '../pages/notification/notification';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { SMS } from '@ionic-native/sms';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Device } from '@ionic-native/device';
import { SQLite } from '@ionic-native/sqlite';
import { CallNumber } from '@ionic-native/call-number';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
/*Providers*/

import {Rutas} from './rute';
import {BdService} from './bd';
import {Login} from '../pages/login/login.provider';
import {Terms} from '../pages/terms/terms.provider';
import {Home} from '../pages/home/home.provider';
import {List} from '../pages/list/list.provider';
import {Map} from '../pages/map/map.provider';
import {Ubicaciones} from '../pages/ubicaciones/ubicaciones.provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TermsPage,
    LoginPage,
    ListPage,
    MapPage,
    DatePage,
    UbicacionesPage,
    PasswordPage,
    ResetPasswordPage,
    ResetPasswordPageTwo,
    NotificationPage
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
    MapPage,
    DatePage,
    UbicacionesPage,
    PasswordPage,
    ResetPasswordPage,
    ResetPasswordPageTwo,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    SMS,
    BackgroundGeolocation,
    Device,
    SQLite,
    Geolocation,
    CallNumber,
    Login,
    Rutas,
    BdService,
    Terms,
    Home,
    List,
    Map,
    Ubicaciones,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

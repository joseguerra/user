import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {Date} from './date.provider';
import { Storage } from '@ionic/storage';
import {MapPage} from '../map/map';

@Component({
  selector: 'page-date',
  templateUrl: 'date.html'
})
export class DatePage {
  public start: string;
  public end: string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public date:Date) {

         
  }

  send() {
    this.navCtrl.push(MapPage, {'id':this.navParams.get('id'),'start':this.start,'end':this.end});
  }



}

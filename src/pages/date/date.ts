import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MapPage} from '../map/map';

@Component({
  selector: 'page-date',
  templateUrl: 'date.html'
})
export class DatePage {
  public start: string;
  public end: string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {

         
  }

  send() {
    this.navCtrl.push(MapPage, {'id':this.navParams.get('id'),'start':this.start,'end':this.end});
  }



}

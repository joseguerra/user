import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Terms} from './terms.provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {
  public numero: string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              public terms:Terms) {

    this.get();               
  }

  get() {

    

  }


}

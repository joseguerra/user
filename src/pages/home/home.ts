import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private sms: SMS,
              private storage: Storage,
              private backgroundGeolocation: BackgroundGeolocation,
              private device: Device) {                  

    storage.get('token').then((val) => {
      console.log('Your token is', val);
    });

    if(this.device.platform){

      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 0,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: false, //  enable this hear sounds for background-geolocation life-cycle.
        interval: 2000
      };
      this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {

        console.log(location);
        this.sendSms();
        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.

      });

      // start recording location
      this.backgroundGeolocation.start();

    }

    


  }


  sendSms(){

    var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: 'INTENT' // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
                //intent: 'INTENT' // send SMS inside a default SMS app
        }
    };

    this.sms.send('416123456', 'Hello world!',options);
  }

  

}

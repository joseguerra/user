import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import {Home} from './home.provider';
import {Ubicaciones} from '../ubicaciones/ubicaciones.provider';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private sms: SMS,
              private storage: Storage,
              private backgroundGeolocation: BackgroundGeolocation,
              private home:Home,
              public alertCtrl: AlertController,
              private ubicaciones:Ubicaciones,
              public loadingCtrl: LoadingController,
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

        var geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&sensor=false';       
        
        this.ubicaciones.get(geocoding).subscribe(
        location => {
          console.log(location)

          var data = {
            latitud: location.latitude,
            longitud: location.longitude,
            fecha: Date.now(),
            formatted_address: location.results[0].formatted_address

          }

          storage.get('token').then((val) => {
            this.home.location(val,data).subscribe(
              data => {
                console.log(data)
              },
              err => {        
                console.log(err)
              }
            );
                    
          });
          
          console.log(location);     

          },
          err => {        
            console.log(err)
          })


           
        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.

      });

      // start recording location
      this.backgroundGeolocation.start();

    }

    


  }


  sendSms(){
    var telefono ;
    this.storage.get('token').then((val) => {
          this.home.telefono(val).subscribe(
            data => {
              telefono = data.telefono;
              console.log(data)
            },
            err => {        
              console.log(err)
            }
          );
                   
        });
    var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: 'INTENT' // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
                //intent: 'INTENT' // send SMS inside a default SMS app
        }
    };

    this.sms.send(telefono, 'Hello world!',options);
  }

  sendMensaje(mensaje){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.storage.get('token').then((val) => {
          this.home.sendMessage(val,mensaje).subscribe(
            data => {   
              loading.dismiss();           
              let alert = this.alertCtrl.create({
                title: 'Perfecto!',
                subTitle: 'Mensaje enviado con exito!',
                buttons: ['OK']
              });
              alert.present();
            },
            err => {   
              loading.dismiss();     
              let alert = this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'revise su red!',
                buttons: ['OK']
              });
              alert.present();
            }
          );
                   
        });
  }

  sendMessage(){
    
    let prompt = this.alertCtrl.create({
      title: 'Mensaje',
      message: "Ingrese el mensaje a enviar al admin",
      inputs: [
        {
          name: 'mensaje',
          placeholder: 'Mensaje'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            this.sendMensaje(data.mensaje);
            console.log(data.mensaje);
          }
        }
      ]
    });
    prompt.present();
  }

  

}

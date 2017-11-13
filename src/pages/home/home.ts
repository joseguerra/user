import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import {Home} from './home.provider';
import {Ubicaciones} from '../ubicaciones/ubicaciones.provider';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public telefono: string;
  public latitud: number;
  public longitud: number;
  public ubicacion: string;
  constructor(public navCtrl: NavController,
              private sms: SMS,
              private storage: Storage,
              private backgroundGeolocation: BackgroundGeolocation,
              private home:Home,
              public alertCtrl: AlertController,
              private ubicaciones:Ubicaciones,
              public loadingCtrl: LoadingController,
              private callNumber: CallNumber,
              private device: Device) {                  

        this.storage.get('token').then((val) => {
          this.home.servicios(val).subscribe(
            data => {
              console.log(data)
            },
            err => {        
              console.log(err)
            }
          );
                   
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
        this.latitud = location.latitude;
        this.longitud = location.longitude;
        var geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&sensor=false';       
        
        this.ubicaciones.get(geocoding).subscribe(
        location => {
          console.log(location)
          this.ubicacion =location.results[0].formatted_address;
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

  call(){
    this.callNumber.callNumber(this.telefono, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }


  sendSms(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    var data = {
      latitud: 8.597175,
      longitud: -71.15824500000001,
      ubicacion: "Mérida",
      tipo: "Pn"

    }
      console.log(data);

        this.storage.get('token').then((val) => {

          this.home.alertas(val,data).subscribe(
            data => {
              console.log(data)

              this.home.telefono(val).subscribe(
                data => {
                  this.telefono = data.telefono;
                  var options = {
                    replaceLineBreaks: false, // true to replace \n by a new line, false by default
                    android: {
                        intent: 'INTENT' // send SMS with the native android SMS messaging
                            //intent: '' // send SMS without open any other app
                            //intent: 'INTENT' // send SMS inside a default SMS app
                    }
                  };

                  this.sms.send(this.telefono, 'Hello world!',options);
                },
                err => {        
                  console.log(err)
                }
              );

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
            var datos = {              
              mensaje: data.mensaje,
              usuario: 1
            }

            this.sendMensaje(datos);
            console.log(datos);
          }
        }
      ]
    });
    prompt.present();
  }

  

}

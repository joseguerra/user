import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController,Events } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import {Home} from './home.provider';
import {Ubicaciones} from '../ubicaciones/ubicaciones.provider';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';

declare var google; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public telefono: string;
  public latitud: string = "8.660723";
  public longitud: string = "-70.251062";
  public latitud_inicial: string = "8.571244";
  public longitud_inicial: string = "-71.206581";
  public ubicacion: string;
  public frecuencia_rastreo: number;
  public kilometraje: number;
  public velocidad: number;
  public tiempo_recarga: number = 9000; // 9seg
  constructor(public navCtrl: NavController,
              private sms: SMS,
              private storage: Storage,
              private backgroundGeolocation: BackgroundGeolocation,
              private home:Home,
              public alertCtrl: AlertController,
              private ubicaciones:Ubicaciones,
              public loadingCtrl: LoadingController,
              private callNumber: CallNumber,
              private geolocation: Geolocation,
              private backgroundMode: BackgroundMode,
              private events: Events,
              private device: Device) {
              
  }

  ionViewDidLoad(){
    this.storage.get('token').then((val) => {
        this.home.servicios(val).subscribe(
          data => {
            this.frecuencia_rastreo = data.results[0].frecuencia_rastreo;
            this.kilometraje = data.results[0].kilometraje;
            this.velocidad = data.results[0].velocidad;
            this.latitud_inicial = data.results[0].latitud_inicial;            
            this.longitud_inicial = data.results[0].longitud_inicial;            
            console.log(data)
            if(this.device.platform){
              this.background()                              
            }            
          },
          err => {        
            console.log(err)
          }
        );
                  
      });

  }

  background(){    
    var object = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    navigator.geolocation.getCurrentPosition(function(position){
      object.latitud = String(position.coords.latitude);
      object.longitud = String(position.coords.longitude);      
      console.log(object.latitud)
      console.log(object.longitud)
      var geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + object.latitud + ',' + object.longitud + '&sensor=false';       
      
      object.ubicaciones.get(geocoding).subscribe(
      location => {     
        console.log(location)     
        object.ubicacion =location.results[0].formatted_address;
        var data = {
          latitud: object.latitud,
          longitud: object.longitud,
          fecha: Date.now(),
          formatted_address: object.ubicacion
        }      

        object.storage.get('token').then((val) => {
          object.home.location(val,data).subscribe(
            data => {     
              loading.dismiss();
              object.alertaKilometros();

              let config = {
                desiredAccuracy: 0,
                stationaryRadius: 0,
                distanceFilter: 0,                
                interval: this.frecuencia_rastreo*60000
              };
              object.backgroundGeolocation.configure(config).subscribe((location) => {
                object.latitud = String(location.latitude);
                object.longitud = String(location.longitude);      
                console.log(object.latitud)
                console.log(object.longitud)
                var geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + object.latitud + ',' + object.longitud + '&sensor=false';       
                
                object.ubicaciones.get(geocoding).subscribe(
                location => {     
                  console.log(location)     
                  object.ubicacion =location.results[0].formatted_address;
                  var data = {
                    latitud: object.latitud,
                    longitud: object.longitud,
                    fecha: Date.now(),
                    formatted_address: object.ubicacion
                  }      

                  object.storage.get('token').then((val) => {
                    object.home.location(val,data).subscribe(
                      data => {         
                        object.alertaKilometros();
                      },
                      err => {        
                        console.log(err)
                      }
                    );
                            
                  });
                },
                err => {        
                  console.log(err)
                })
              })

              object.backgroundGeolocation.start();

              object.events.subscribe('setInterval:changed', group => {
                console.log("pare la vaina")
                object.backgroundGeolocation.stop();
              })


            },
            err => {        
              console.log(err)
            }
          );
                  
        },err=>{
          loading.dismiss();
        });
      },
      err => {        
        console.log(err)
      })
    })


    
  }

  alertaKilometros(){
    var self = this;
    var destino = {
        lat: parseFloat(this.latitud),
        lng: parseFloat(this.longitud)
    }
    var miUbicacion = {
        lat: parseFloat(this.latitud_inicial),
        lng: parseFloat(this.longitud_inicial)
    }
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins:[miUbicacion],  
        destinations:[destino],      
        travelMode: google.maps.TravelMode.DRIVING,        
      },function (response, status) {       
        try{
          var res = response.rows[0].elements[0].distance.text.split(" ");                        
          
          if(res[0] > self.kilometraje){
            self.alerta("Km")
          }
          
          var tiempo_seg = self.tiempo_recarga / 1000;
          var tiempo_horas = tiempo_seg / 3600;
          var velocidad = res[0] / tiempo_horas;
          ////////////////////////////////////////////7/
          let alert = self.alertCtrl.create({
            title: 'Velocidad',
            subTitle: velocidad + " Kilometros por hora",
            buttons: ['OK']
          });
          alert.present();
          /////////////////////////////////////////////
          if (velocidad > self.velocidad)
          {
           self.alerta("Vl");
          }
          self.latitud_inicial = self.latitud;
          self.longitud_inicial = self.longitud;
          setTimeout(function(){ 
            try{
              self.alertaKilometros();
            }catch(e){console.log(e)}
          }, self.tiempo_recarga);
            
        }catch(e){
          console.log("no se pudo calcular la distancia")
        } 
                
      });
    }


    alertaVelocidad(){
      var self = this;
      var destino = {
          lat: parseFloat(this.latitud),
          lng: parseFloat(this.longitud)
      }
      var miUbicacion = {
          lat: parseFloat(this.latitud_inicial),
          lng: parseFloat(this.longitud_inicial)
      }
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
      {
        origins:[miUbicacion],  
        destinations:[destino],      
        travelMode: google.maps.TravelMode.DRIVING,        
      },function (response, status) {       
        try{
          var res = response.rows[0].elements[0].distance.text.split(" ");                        
        if(res[0] > self.kilometraje){
          self.alerta("Km")
        }  
        }catch(e){
          console.log("no se pudo calcular la distancia")
        } 
                
      });
    }

  //De aqui pa abajo no toques nada 




  call(){
    this.callNumber.callNumber("9612030307", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  alerta(tipo){
    console.log(tipo)
    var data = {
      latitud: this.latitud,
      longitud: this.longitud,
      ubicacion: this.ubicacion,
      tipo: tipo

    }

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

                  this.sms.send("9612030307", 'Hello world!',options);
                },
                err => {        
                  console.log(err)
                }
              );
            },
            err => {        
            }
          );
        });
  }


  sendSms(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    var data = {
      latitud: this.latitud,
      longitud: this.longitud,
      ubicacion: this.ubicacion,
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

                  this.sms.send("9612030307", 'Estoy en peligro',options);
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

import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Rutas} from '../../app/rute';

/*
  Generated class for the Register provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Home {

  constructor(
    public http: Http,
    public rutas: Rutas
  ) {
  }

  location(token,data){
    var url = this.rutas.location(token);
    var response = this.http.post(url,data).map(res => res.json());
    return response;

  }

  telefono(token){
    var url = this.rutas.telefono(token);
    var response = this.http.get(url).map(res => res.json());
    return response;

  }

  sendMessage(token,message){
    var url = this.rutas.location(token);
    var response = this.http.post(url,message).map(res => res.json());
    return response;
  }



}

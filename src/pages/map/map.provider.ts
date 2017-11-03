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
export class Map {

  constructor(
    public http: Http,
    public rutas: Rutas
  ) {
  }

  get(token){
    var url = this.rutas.hijos_ubicacion(token);
    var response = this.http.get(url).map(res => res.json());
    return response;

  }

  get_ubicaciones(token,id){
    var url = this.rutas.hijos_ubicaciones(token,id);
    var response = this.http.get(url).map(res => res.json());
    return response;

  }



}

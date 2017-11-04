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
export class Date {

  constructor(
    public http: Http,
    public rutas: Rutas
  ) {
  }

  get(token){
    var url = this.rutas.mis_hijos(token);
    var response = this.http.get(url).map(res => res.json());
    return response;

  }



}

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
export class Terms {

  constructor(
    public http: Http,
    public rutas: Rutas
  ) {
  }

  get(token){
    
    let authHeader = 'Token '+token;

    let headers = new Headers();
    headers.append('Authorization', authHeader);

    var url = this.rutas.profile();
    var response = this.http.get(url,{ headers: headers }).map(res => res.json());
    return response;

  }

  update(perfil_id,token){
    let params = {};

    var url = this.rutas.phone(perfil_id);
    var response = this.http.put(url,params).map(res => res.json());
    return response;

  }


}

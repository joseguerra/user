import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Rutas} from '../../app/rute';

/*
  Generated class for the Register provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Login {

  constructor(
    public http: Http,
    public rutas: Rutas
  ) {
  }

  login(username,password,onesignal_id){
    let params = { username: username, password:password, onesignal_id:onesignal_id };

    var url = this.rutas.login();
    var response = this.http.post(url,params).map(res => res.json());
    return response;

  }
  logout(token){
    let params = {};

    var url = this.rutas.logout(token);
    var response = this.http.post(url, params).map(res => res.json());
    return response;

  }


}

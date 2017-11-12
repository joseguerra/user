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
  change_password(username,old_password,new_password, token){
    let params = { username: username, old_password:old_password, new_password:new_password };

    var url = this.rutas.change_password(token);
    var response = this.http.post(url,params).map(res => res.json());
    return response;

  }

  reset_password_one(correo){
    let params = { username: correo};

    var url = this.rutas.reset_password()+"?email="+correo;
    var response = this.http.get(url,params).map(res => res.json());
    return response;

  }
  reset_password_two(token, pass){
    let params = { new_password: pass, token: token};

    var url = this.rutas.reset_password();
    var response = this.http.get(url,params).map(res => res.json());
    return response;

  }

}

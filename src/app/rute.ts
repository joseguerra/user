export class Rutas{
  urlbase: string = "http://guaruras.herokuapp.com/";
  constructor(){}


  login(){
    return this.urlbase+ "api/v1/api-token-auth/";
  }
  logout(token){
    return this.urlbase+ "api/v1/api-token-logout/?token={0}".replace('{0}', token);
  }

  phone(perfil_id){
      return this.urlbase+ "/api/v1/perfil/"+perfil_id+"/telefono/";
  }

  profile(){
      return this.urlbase+ "api/v1/perfil/";
  }

  terms(){
      return this.urlbase+ "api/v1/terminos-api/";
  }

  location(token){
      return this.urlbase+ "api/v1/ubicacion/?token={0}".replace("{0}", token);
  }

  mis_hijos(token){
      return this.urlbase+ "api/v1/ubicacion/mis_hijos/?token={0}".replace("{0}", token);
  }

  hijos_ubicacion(token){
      return this.urlbase+ "api/v1/ubicacion/hijos_ubicacion/?token={0}".replace("{0}", token);
  }
  change_password(token){
    return this.urlbase+ "api/v1/change-password/?token={0}".replace("{0}", token);
  }
  reset_password(){
    return this.urlbase+ "api/v1/reset-password/";
  }
  hijos_ubicaciones(token,hijo_perfil_id,inicio,fin ){
      var url = this.urlbase+ "api/v1/ubicacion/hijos_ubicaciones/?token={0}".replace("{0}", token)+"&hijo_perfil_id={0}".replace("{0}", hijo_perfil_id);
      if(inicio){
          url+= "&inicio={0}".replace("{0}", inicio)
      }
      if(fin){
          url+= "&fin={0}".replace("{0}", fin);
      }
      return url;
  }

  telefono(token){
      return this.urlbase+ "api/v1/get-admin-phone/?token={0}".replace("{0}", token);
  }

  sendMessage(token){      
      return this.urlbase+ "api/v1/mensajes/?token={0}".replace("{0}", token);
  }

  servicios(token){      
      return this.urlbase+ "api/v1/servicios/?token={0}".replace("{0}", token);
  }

  alertas(token){      
      return this.urlbase+ "api/v1/alertas/?token={0}".replace("{0}", token);
  }

  


}

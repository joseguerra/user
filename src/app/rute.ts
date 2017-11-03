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

  hijos_ubicaciones(token,hijo_perfil_id ){
      return this.urlbase+ "api/v1/ubicacion/hijos_ubicaciones/?token={0}".replace("{0}", token)+"&hijo_perfil_id={0}".replace("{0}", hijo_perfil_id);
  }


}

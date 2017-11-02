export class Rutas{
  urlbase: string = "http://guaruras.herokuapp.com/";
  constructor(){}


  login(){
    return this.urlbase+ "api/v1/api-token-auth/";
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


}

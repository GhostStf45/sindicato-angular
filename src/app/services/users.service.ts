import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api, Register, Login, SendEmailVerification, ConfirmEmailVerification} from '../config';
import { UsersModel } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api:string = Api.url;
  private register:string = Register.url;
  private login:string = Login.url;
  private sendEmailVerification:string = SendEmailVerification.url;
  private confirmEmailVerification:string = ConfirmEmailVerification.url;


  constructor(private http:HttpClient) {

   }
   /* Registro en firabase authentication */
   registerAuth(user:UsersModel){
     return this.http.post(`${this.register}`, user);
   }
    /* Registro en firabase DATABASE */
    registerDatabase(user:UsersModel){

      delete user.password;
      delete user.returnSecureToken;

      return this.http.post(`${this.api}/usuarios.json`, user);
    }
  /* filtrar la data para buscar coincidencias */
  getFilterData(orderBy:string, equalTo:string){
    return this.http.get(`${this.api}usuarios.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
  }

  /* Login en firabase authentication */
  loginAuth(user: UsersModel){
    return this.http.post(`${this.login}`, user);
  }
  /* Enviar verificacion de correo electronico */
  sendEmailVerificationFnc(body: object){
    return this.http.post(`${this.sendEmailVerification}`, body);
  }
  /* Confirmar verificacion de correo electronico */
  confirmEmailVerificationFnc(body: object){
    return this.http.post(`${this.confirmEmailVerification}`, body);
  }
  /* Actualizar data de usuario */
  patchData(id:string, value: object){
    return this.http.patch(`${this.api}usuarios/${id}.json`, value);
  }

}

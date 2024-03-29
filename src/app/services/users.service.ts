import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  Api,
  Register,
  Login,
  SendEmailVerification,
  ConfirmEmailVerification,
  GetUserData,
  SendPasswordResetEmail,
  VerifyPasswordResetCode,
  ConfirmPasswordReset
} from '../config';
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
  private getUserData:string = GetUserData.url;
  private sendPasswordResetEmail:string = SendPasswordResetEmail.url;
  private verifyPasswordResetCode:string = VerifyPasswordResetCode.url;
  private confirmPasswordReset:string = ConfirmPasswordReset.url;


  public tipoService:string = "";
  public estadoService:string = "";



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
  /* Validar idTOken */
  authActivate(){
    return new Promise(resolve =>{

      if(localStorage.getItem("idToken")){
        let body = {
          idToken: localStorage.getItem("idToken")
        }
        this.http.post(`${this.getUserData}`, body)
                  .subscribe( resp => {
                    /* Validar la fecha de expiracion */
                    if(localStorage.getItem("expiresIn")){
                      let expiresIn = Number(localStorage.getItem("expiresIn"));
                      let expiresDate = new Date();
                      expiresDate.setTime(expiresIn);
                      if(expiresDate > new Date()){
                        resolve (true);
                      }else{
                        localStorage.removeItem("idToken");
                        localStorage.removeItem("expiresIn");
                        resolve (false);
                      }

                    }else{
                      localStorage.removeItem("idToken");
                      localStorage.removeItem("expiresIn");
                      resolve(false);
                    }

                    resolve(true);
                  },err => {
                    localStorage.removeItem("idToken");
                    localStorage.removeItem("expiresIn");
                    resolve(false);
                  });

      }else{
        localStorage.removeItem("idToken");
        localStorage.removeItem("expiresIn");
        resolve(false);
      }
    });
  }
  /* Resetear la contraseña */
  SendPasswordResetEmailFnc(body: object){
    return this.http.post(`${this.sendPasswordResetEmail}`, body);
  }
  /* Confirmar el cambio de la contraseña */
  VerifyPasswordResetCodeFnc(body: object){
    return this.http.post(`${this.verifyPasswordResetCode}`, body);
  }
  /* Enviar la nueva contraseña */
  ConfirmPasswordResetFnc(body: object){
    return this.http.post(`${this.confirmPasswordReset}`, body);
  }

  /* Consulta a RENIEC */

  ConsultaReniecFnc(dni:string){
    return this.http.get(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRvcGd1bmNvdW50ZXJAZ21haWwuY29tIn0.fSQegRlnAsbVesRoS5fQuUAgAmXQN_DlKMzP74XQf0M`);
  }

  get role(){
    this.tipoService = localStorage.getItem('tipo');
    return this.tipoService;
  }
  get estado(){
    this.estadoService = localStorage.getItem('estado');
    return this.estadoService;
  }

}

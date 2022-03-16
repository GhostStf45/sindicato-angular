import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api, Register} from '../config';
import { UsersModel } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api:string = Api.url;
  private register:string = Register.url;

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

}

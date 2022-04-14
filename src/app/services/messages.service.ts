import { Injectable } from '@angular/core';
import { MessageModel } from '../models/message.model';
import {HttpClient} from '@angular/common/http';
import { Api } from '../config';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private api:string = Api.url;

  constructor(private http:HttpClient) { }

  /* */
  registerDatabase(body: MessageModel, idToken:string){
    return this.http.post(`${this.api}messages.json?auth=${idToken}`, body);
  }
  /* */
  patchDataAuth(id:string, value:object, idToken: string){
    return this.http.patch(`${this.api}messages/${id}.json?auth=${idToken}`, value);
  }

  /* */
  getFilterData(orderBy:string, equalTo: string){
    return this.http.get(`${this.api}messages.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
  }
}

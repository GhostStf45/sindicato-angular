import { Injectable } from '@angular/core';
import { Api } from '../config';
import {HttpClient} from '@angular/common/http';
import { Idocumentos } from 'src/app/interfaces/Idocumentos';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private api:string = Api.url;

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(`${this.api}documentos.json`);
  }

  getFilterData(orderBy: string, equalTo: string){
    return this.http.get(`${this.api}documentos.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
  }
  /* Guardar informacion del tipo */
  postData(data: Idocumentos){
    return this.http.post(`${this.api}documentos.json`, data);
  }
  getDataByDate(startDate: string, endDate: string){
    return this.http.get(`${this.api}documentos.json?orderBy="fechaDenuncia"&startAt="${startDate}"&endAt="${endDate}"&print=pretty`);
  }
}

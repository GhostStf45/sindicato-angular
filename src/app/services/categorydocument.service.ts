import { Injectable } from '@angular/core';
import { Icategoriasdocuments } from 'src/app/interfaces/Icategoriasdocuments';
import { Api } from '../config';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategorydocumentService {

  private api:string = Api.url;

  constructor( private http:HttpClient) { }

  getData(){
    return this.http.get(`${this.api}categorias.json`);
  }

  /* Guardar informacion del tipo */
  postData(data: Icategoriasdocuments){
    return this.http.post(`${this.api}categorias.json`, data);
  }
  getFilterData(orderBy: string, equalTo: string){
    return this.http.get(`${this.api}categorias.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
  }

}

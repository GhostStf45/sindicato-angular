import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosService {

  private api: String  = Api.url;

  constructor( private http: HttpClient) { }


    /*================================================
    Tomar la data de los afiliados
    ================================================ */
  getData(){
    return this.http.get(`${ this.api }usuarios.json`);
  }
  getItem(id: string){
    return this.http.get(`${this.api}usuarios/${id}.json`);
  }
  /* Actualizar data de usuario */
  patchData(id:string, data: object){
    return this.http.patch(`${this.api}usuarios/${id}.json`, data);
  }
}

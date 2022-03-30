import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  displayNameVista: string = "";
  tipo: string = "";
  dni: string = "";
  fecha_inscripcion:string = "";

  constructor() { }

  ngOnInit(): void {
    this.getDataStorage();
  }

  getDataStorage(){
    this.displayNameVista = localStorage.getItem("displayName");
    this.dni = localStorage.getItem("dni");
    this.tipo = localStorage.getItem("tipo");
    this.fecha_inscripcion = localStorage.getItem("fecha_inscripcion");
  }
  /* Salir del sistema */
  logout(){
    localStorage.removeItem("idToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("tipo");
    localStorage.removeItem("displayName");
    localStorage.removeItem("dni");
    localStorage.removeItem("fecha_inscripcion");
    window.open('login', "_top");
  }

}

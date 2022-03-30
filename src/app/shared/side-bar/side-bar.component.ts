import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  displayNameVista: string = "";
  tipo: string = "";
  dni: string = "";

  constructor() { }

  ngOnInit(): void {
    this.getDataStorage();
  }

  getDataStorage(){
    this.displayNameVista = localStorage.getItem("displayName");
    this.dni = localStorage.getItem("dni");
    this.tipo = localStorage.getItem("tipo");
  }
  /* Salir del sistema */
  logout(){
    localStorage.removeItem("idToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("tipo");
    localStorage.removeItem("displayName");
    localStorage.removeItem("dni");
    window.open('login', "_top");
  }


}

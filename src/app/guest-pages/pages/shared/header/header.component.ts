import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-header-guest',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authValidate:boolean = false;

  displayName:string = "";


  tipo: string = "";


  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
     /* validar si existe el usuario autenticado */
     this.usersService.authActivate().then( resp => {
      if(resp){
        this.authValidate =true;
        this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
            .subscribe( resp => {
              for( const i in resp){
                if(resp[i].displayName != ""){
                  this.displayName = `<span class="font-weight-bold">${resp[i].displayName} | Mi cuenta </span><i class="fas fa-angle-down ml-2"></i>`;
                }
                if(resp[i].tipo == "Dirigente" || resp[i].tipo == "Afiliado" ){
                  this.tipo = resp[i].tipo;
                }else{
                  this.tipo = "Invitado";
                }
                localStorage.setItem("tipo", resp[i].tipo);
                localStorage.setItem("displayName", resp[i].displayName);
                localStorage.setItem("dni", resp[i].dni);
                localStorage.setItem("fecha_inscripcion", resp[i].fecha_incripcion);


              }
            });
      }
    });
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

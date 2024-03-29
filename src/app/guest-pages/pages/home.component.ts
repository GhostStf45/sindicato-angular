import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authValidate:boolean = false;

  displayName:string = "";


  tipo: string = "";

  constructor( private usersService: UsersService) { }

  ngOnInit(): void {
    // if(!this.usersService.authActivate()){
    //     window.open("login", "_top");
    // }
    this.usersService.authActivate().then(resp => {
      if(!resp){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Token no valido, asegurese que la cuenta exista'
        })
        //window.open("login", "_top");
      }
    });

     /* validar si existe el usuario autenticado */
     this.usersService.authActivate().then( resp => {
      if(resp){
        this.authValidate =true;
        this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
            .subscribe( resp => {
              var id = Object.keys(resp).toString();
              console.log(id);
              for( const i in resp){

                if(resp[i].displayName != ""){
                  this.displayName = `<span class="font-weight-bold">${resp[i].displayName} | Mi cuenta </span><i class="fas fa-angle-down ml-2"></i>`;
                }
                if(resp[i].tipo == "Dirigente" || resp[i].tipo == "Afiliado" ){
                  this.tipo = resp[i].tipo;
                }else{
                  this.tipo = "Invitado";
                }
                console.log(resp[i]);
                localStorage.setItem("tipo", resp[i].tipo);
                localStorage.setItem("displayName", resp[i].displayName);
                localStorage.setItem("dni", resp[i].dni);
                localStorage.setItem("fecha_inscripcion", resp[i].fecha_incripcion);
                localStorage.setItem("estado", resp[i].estado);
                localStorage.setItem("id", id);


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
    localStorage.removeItem("estado");
    window.open('login', "_top");
  }

}

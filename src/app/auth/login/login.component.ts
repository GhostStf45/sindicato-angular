import { Component, OnInit } from '@angular/core';
import { UsersModel } from '../../models/users.model';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:UsersModel;
  rememberMe:boolean = false;

  constructor(private usersService: UsersService,
              private activatedRoute: ActivatedRoute) {
    this.user = new UsersModel();

   }

  ngOnInit(): void {



    /* Validar acción de recordar de credencial de correo */

    if(localStorage.getItem("rememberMe") && localStorage.getItem("rememberMe") == "yes"){
      this.user.email = localStorage.getItem("email");
      this.rememberMe = true;
    }

     // Validar formulario en bootstrap 4
    $('[data-toggle="tooltip"]').tooltip();
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);

    })()
     // Verficar cuenta de correo electronico
     if(this.activatedRoute.snapshot.queryParams["oobCode"] != undefined && this.activatedRoute.snapshot.queryParams["mode"] == "verifyEmail"){
       let body  = {
         oobCode: this.activatedRoute.snapshot.queryParams["oobCode"]
       }
       this.usersService.confirmEmailVerificationFnc(body)
          .subscribe( resp => {
              if(resp['emailVerified']){
                 // Actualizar confirmacion de  correo en database
                 this.usersService.getFilterData("email", resp["email"]).subscribe( resp => {
                   for(const i in resp){
                     let id = Object.keys(resp).toString();
                     let value = {
                       needConfirm: true
                     };
                     this.usersService.patchData(id, value)
                        .subscribe( resp => {
                          if(resp['needConfirm']){
                            Swal.fire('¡Operación exitosa!', 'Su correo ha sido confirmado correctamente', 'success');
                          }
                        })
                     ;
                   }
                 })
              }
          }, err => {
            if( err.error.error.message == "INVALID_OOB_CODE"){

              Swal.fire('Error', 'El correo ya fue confirmado', 'error');
            }
          });
     }
     /* Confirmar cambio de contraseña */
     if(this.activatedRoute.snapshot.queryParams["oobCode"] != undefined && this.activatedRoute.snapshot.queryParams["mode"] == "resetPassword"){
      let body  = {
        oobCode: this.activatedRoute.snapshot.queryParams["oobCode"]
      }
      this.usersService.confirmEmailVerificationFnc(body)
         .subscribe( resp => {
            if(resp["requestType"] == "PASSWORD_RESET"){
                $("#newPassword").modal();
            }
         });
      }
  }

    // Validacion de expresion regular del formulario para
    validate(input){
      let pattern;
      if($(input).attr("name") == "password"){
        pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
      }
      if(!pattern.test(input.value)){
          $(input).parent().addClass('was-validated');
          input.value = "";
      }
   }

  onSubmit(f: NgForm) {
    console.log('f', f);
    if(f.invalid){
      return;
    }


    Swal.fire({
      allowOutsideClick: false,
      title: 'Cargando',
      text: '',
    });
    Swal.showLoading();

     // Validar que el correo esté verificado

    this.usersService.getFilterData("email", this.user.email)
        .subscribe( resp1 => {
          for(const i in resp1){
            if(resp1[i].needConfirm){
                // Login de firebase authentication

              this.user.returnSecureToken = true;

              this.usersService.loginAuth (this.user)
                  .subscribe( resp2 => {
                    /* ALMACENAR ID TOKEN */
                    let id = Object.keys(resp1).toString();
                   // this.user.idToken = resp2['idToken'];
                    let value = {
                      idToken: resp2["idToken"]
                    };
                    this.usersService.patchData(id, value)
                      .subscribe( resp3 => {
                        if(resp3['idToken'] != "" ){
                          Swal.close();
                          /* Almacenamos el token de seguridad en el localstorage */
                          localStorage.setItem("idToken", (resp3["idToken"]));
                          /* Almacenamos el email de seguridad en el localstorage */
                          localStorage.setItem("email", (resp2["email"]));
                          /* Almacenamos la fecha de expiracion en el localstorage */
                          let today = new Date();
                          today.setSeconds(resp2["expiresIn"]);
                          localStorage.setItem("expiresIn", today.getTime().toString());

                          /* Almacenamos recordar email en el localstorage */

                          if(this.rememberMe){
                            localStorage.setItem("rememberMe", "yes");
                          }
                          else{
                            localStorage.setItem("rememberMe", "no");
                          }

                          /* Redireccionar a la pagina home */

                          window.open("home", "_top");
                        }
                    });
                  }, (err)=> {
                    Swal.fire("Error", err.error.error.message,"error");
                  });
            }else{
              Swal.fire('Advertencia', "Necesita confirmar su email", "warning");
            }
          }
        });




  }
  /* Enviar solicitud para recuperar contraseña */

  resetPassword(value){
    Swal.fire({
      allowOutsideClick: false,
      title: 'Cargando',
      text: '',
    });
    Swal.showLoading();

    let body = {
      requestType: "PASSWORD_RESET",
      email: value
    }
    this.usersService.sendEmailVerificationFnc(body)
        .subscribe( resp => {
          if(resp["email"] == value){
            Swal.fire('¡Enviado!', "Vefique su bandeja de entrada para cambiar la contraseña", "success");
          }
        });

  }
   /* Enviar la nueva contraseña */
  newPassword(value){
    Swal.fire({
      allowOutsideClick: false,
      title: 'Cargando',
      text: '',
    });
    Swal.showLoading();

    let body = {
      oobCode: this.activatedRoute.snapshot.queryParams["oobCode"],
      newPassword: value
    }
    this.usersService.ConfirmPasswordResetFnc(body)
        .subscribe( resp => {
          console.log(resp);
          if(resp["requestType"] == "PASSWORD_RESET"){
            Swal.fire('!Cambio exitoso!', "Su contraseña ha sido cambiada correctamente", "success");
            window.open("login", "_top");
          }
        });

  }

}

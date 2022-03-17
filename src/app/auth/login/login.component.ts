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

  constructor(private usersService: UsersService,
              private activatedRoute: ActivatedRoute) {
    this.user = new UsersModel();

   }

  ngOnInit(): void {

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
          });
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
        .subscribe( resp => {
          for(const i in resp){
            if(resp[i].needConfirm){
                // Login de firebase authentication

              this.user.returnSecureToken = true;

              this.usersService.loginAuth (this.user)
                  .subscribe( resp => {
                    Swal.close();
                    console.log("resp", resp);
                  }, (err)=> {
                    Swal.fire("Error", err.error.error.message,"error");
                  });
            }else{
              Swal.fire('Advertencia', "Necesita confirmar su email", "warning");
            }
          }
        });




  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersModel } from '../../models/users.model';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Capitalize } from '../../functions';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UsersModel;

  constructor(private usersService: UsersService) {
    this.user = new UsersModel();

  }

  ngOnInit(): void {
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
    })();

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'warning',
      title: 'Aviso: Asegurese que el DNI exista antes de completar el registro'
    })

  }
   // Validacion de expresion regular del formulario para
   validate(input){
      let pattern;

      // if($(input).attr("name") == "email"){
      //   this.usersService.getFilterData("email", input.value)
      //     .subscribe(resp => {
      //       if(Object.keys(resp).length > 0){
      //         $(input).parent().addClass('was-validated');

      //         input.value = "";
      //       }
      //     });
      // }

      if($(input).attr("name") == "dni"){
        this.usersService.getFilterData("dni", input.value)
          .subscribe(resp => {
            if(Object.keys(resp).length > 0){
              $(input).parent().addClass('was-validated');
              Swal.fire("Error", "El DNI ya esta registrado","error");
              input.value = "";
            }
        });
        this.usersService.ConsultaReniecFnc(input.value).subscribe( resp => {
            if(resp["message"] === "No se encontraron resultadoss."){
              $(input).parent().addClass('was-validated');
              Swal.fire("Error", "El DNI no existe en RENIEC","error");
              input.value = "";
            }
        });

      }

      if($(input).attr("name") == "nombres"){
        pattern = /^[A-Za-z]{2,20}$/;
      }
      if($(input).attr("name") == "apellidos"){
        pattern = /^[A-Za-z]{2,20}$/;
      }
      if($(input).attr("name") == "password"){
        pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
      }
      if(!pattern.test(input.value)){
          $(input).parent().addClass('was-validated');
          input.value = "";
      }
   }
   // Envio del formulario

  onSubmit(f:NgForm){
    if(f.invalid){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Cargando',
      text: '',
    });
    Swal.showLoading();

    // REGISTRO FIREBASE AUTHENTICATION
    this.user.returnSecureToken = true;


    this.usersService.registerAuth (this.user)
        .subscribe( resp => {
          if(resp['email'] == this.user.email){

            /* Enviar correo de verificacion */
           let body = {
            requestType: "VERIFY_EMAIL",
            idToken: resp["idToken"]
            };

            this.usersService.sendEmailVerificationFnc(body)
                .subscribe(resp => {

                  this.user.displayName = `${this.user.nombres} ${this.user.apellidos}`;


                  this.user.needConfirm = false;

                  this.usersService.registerDatabase(this.user)
                      .subscribe( resp => {
                        Swal.fire("Registrado", "Confirme su cuenta de correo electronico (revise la carpeta de spam) ","success");
                      });
            });

          }
    },(err)=> {
      Swal.fire("Error", err.error.error.message,"error");
      console.log(err.error.error.message);
    });

    //console.log('this.user', this.user);

    //console.log("f", f);
    //this.usersService.registerAuth(this.user)
  }

}

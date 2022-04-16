import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import { Iafiliados } from 'src/app/interfaces/Iafiliados';
import { ActivatedRoute, Router } from '@angular/router';
import { AfiliadosService } from '../../../services/afiliados.service';

import Swal from 'sweetalert2';
import { functions } from 'src/app/helpers/functions';
import { Observable } from 'rxjs';

declare var jQuery:any;
declare var $:any;



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {



  public f = this.form.group({
    nombres:['', { validators: [Validators.required, Validators.maxLength(50), Validators.pattern(/[.\\,\\0-9a-zA-ZáéíóúñÁÉÍÓÚÑ]{1,50}/) ]}],
    apellidos: ['', { validators: [Validators.required, Validators.maxLength(50), Validators.pattern(/[.\\,\\0-9a-zA-ZáéíóúñÁÉÍÓÚÑ]{1,50}/)]}],
    telefono: ['', { validators: [Validators.required, Validators.maxLength(9), Validators.pattern(/[.\\,\\0-9]{0,9}/)]}],
    area_laboral_: ['', { validators: [Validators.required, Validators.maxLength(50), Validators.pattern(/[.\\,\\a-zA-ZáéíóúñÁÉÍÓÚÑ]{1,50}/)]}],
    dni: ['', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/[0-9]/)],
        asyncValidators:[this.existDNI()],
        updateOn:'blur'
    }],
    departamento: ['', { validators: [Validators.required]}],
    provincia: ['', { validators: [Validators.required]}],
    distrito: ['', { validators: [Validators.required]}],
    avenida: ['', { validators: [Validators.required]}],

  })

  authValidate:boolean = false;


  formSubmitted = false;

  loadData = false;

  idAfiliado = "";

  displayName:string = "";
  tipo: string = "";
  estado: string = "";
  email_: string = "";
  departamento_: string = "";
  provincia_:string = "";
  distrito_:string = "";
  avenida_: string = "";




  get nombres(){ return this.f.controls.nombres}
  get apellidos(){ return this.f.controls.apellidos}
  get telefono(){ return this.f.controls.telefono}
  get area_laboral_() { return this.f.controls.area_laboral_}
  get dni_(){ return this.f.controls.dni}
  get departamento(){ return this.f.controls.departamento}
  get provincia(){ return this.f.controls.provincia}
  get distrito(){ return this.f.controls.distrito}
  get avenida(){ return this.f.controls.avenida}


  constructor(private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private form: FormBuilder,
    private router: Router,
    private afiliadosService: AfiliadosService) {



  }

  ngOnInit(): void {

      /* validar si existe el usuario autenticado */
      this.usersService.authActivate().then( resp => {
        if(resp){
          this.authValidate =true;
          this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
              .subscribe( resp => {
                for( const i in resp){

                    this.idAfiliado = Object.keys(resp).toString();


                    this.idAfiliado = resp[i].id;
                    this.estado = resp[i].estado;
                    this.email_ = resp[i].email;
                    this.departamento_ = resp[i].departamento;
                    this.provincia_ = resp[i].provincia;
                    this.distrito_ = resp[i].distrito;
                    this.avenida_ = resp[i].avenida;

                    this.f.controls['departamento'].setValue(this.departamento_	, {onlySelf: true});
                    this.f.controls['provincia'].setValue(this.provincia_	, {onlySelf: true});
                    this.f.controls['distrito'].setValue(this.distrito_	, {onlySelf: true});

                  if(resp[i].displayName != ""){
                    this.displayName = resp[i].displayName;
                  }
                  if(resp[i].tipo == "Dirigente" || resp[i].tipo == "Afiliado" ){
                    this.tipo = resp[i].tipo;
                  }else{
                    this.tipo = "Invitado";
                  }
                  this.nombres.setValue(resp[i].nombres);
                  this.apellidos.setValue(resp[i].apellidos);
                  this.telefono.setValue(resp[i].telefono);

                  this.dni_.setValue(resp[i].dni);
                  this.area_laboral_.setValue(resp[i].area_laboral);




                }
              });
        }
      });
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
          if(resp["requestType"] == "PASSWORD_RESET"){
            Swal.fire('!Cambio exitoso!', "Su contraseña ha sido cambiada correctamente", "success");
            window.open("login", "_top");
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
    localStorage.removeItem("id");
    window.open('login', "_top");
  }

  updateAfiliado(){
    this.formSubmitted = true;
    if(this.f.invalid){
      return;
    }
    this.loadData = true;
    this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
              .subscribe( resp => {
                for( const i in resp){
                    this.idAfiliado = Object.keys(resp).toString();
                    const dataAfiliado: Iafiliados = {
                      apellidos: this.f.controls.apellidos.value,
                      nombres: this.f.controls.nombres.value,
                      displayName: `${this.f.controls.nombres.value} ${this.f.controls.apellidos.value}`,
                      area_laboral: this.f.controls.area_laboral_.value,
                      telefono: this.f.controls.telefono.value,
                      dni: this.f.controls.dni.value,
                      departamento: this.f.controls.departamento.value,
                      provincia: this.f.controls.provincia.value,
                      distrito: this.f.controls.distrito.value,
                      avenida: this.f.controls.avenida.value,

                    }
                    console.log(this.f.controls.departamento.value);
                    console.log(this.f.controls.nombres.value);
                    /* Guardar en la base de datos la info del producto */
                    this.afiliadosService.patchData(this.idAfiliado, dataAfiliado).subscribe(
                      resp => {
                        this.loadData = false;
                        Swal.fire('Ok', 'Su cuenta ha sido actualizado correctamente', "success").then(()=>{ window.location.reload();});
                      },
                      err => {
                        this.loadData = false;
                        Swal.fire('Error', 'Error al actualizar su cuenta', "error");
                      }
                    )
                    console.log(dataAfiliado);
                }
      });


  }
  invalidField(field:string){
    return functions.invalidField(field, this.f, this.formSubmitted);
  }
  existDNI(){
    return( control: AbstractControl) => {
       const name = control.value;
       return new Promise((resolve)=> {
         this.usersService.ConsultaReniecFnc(name)
             .subscribe(
               resp => {

                 if(resp["message"] === "No se encontraron resultadoss."){
                   resolve({exist: true });

                 }

               }
             )
       })
     }
  }
  existDNIinDatabase() {
   return ( control: AbstractControl)  => {
      const name = control.value;
      return new Promise((resolve)=> {
       this.usersService.getFilterData("dni", name)
            .subscribe(
              resp => {

                if(Object.keys(resp).length > 0){
                  resolve({existDNI: true });

                }


              }
            )
      })
    }
 }



}

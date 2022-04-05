import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfiliadosService } from '../../../../services/afiliados.service';
import {FormBuilder, Validators} from '@angular/forms';
import { functions } from 'src/app/helpers/functions';
import { Iafiliados } from 'src/app/interfaces/Iafiliados';
import Swal from 'sweetalert2';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-edit-afiliado',
  templateUrl: './edit-afiliado.component.html',
  styleUrls: ['./edit-afiliado.component.css']
})
export class EditAfiliadoComponent implements OnInit {

  public f = this.form.group({
    nombres: ['', { validators: [Validators.required, Validators.maxLength(50), Validators.pattern(/[.\\,\\0-9a-zA-ZáéíóúñÁÉÍÓÚÑ]{1,50}/)]}],
    apellidos: ['', { validators: [Validators.required, Validators.maxLength(50), Validators.pattern(/[.\\,\\0-9a-zA-ZáéíóúñÁÉÍÓÚÑ]{1,50}/)]}],
    telefono: ['', { validators: [Validators.required, Validators.maxLength(9), Validators.pattern(/[.\\,\\0-9]{0,9}/)]}],
    area_laboral: ['', { validators: [Validators.required, Validators.maxLength(50), Validators.pattern(/[.\\,\\a-zA-ZáéíóúñÁÉÍÓÚÑ]{1,50}/)]}],
    estado:['', [Validators.required]],
    tipo:['', [Validators.required]],
  });

  /* Validacion personalizada */

  get nombres(){ return this.f.controls.nombres}
  get apellidos(){ return this.f.controls.apellidos}
  get telefono(){ return this.f.controls.telefono}
  get area_laboral(){ return this.f.controls.area_laboral}
  get estado(){ return this.f.controls.estado}
  get tipo(){ return this.f.controls.tipo}

  formSubmitted = false;

  loadData = false;

  estados:any = [];

  idAfiliado = "";


  constructor( private activatedRoute: ActivatedRoute, private afiliadosService: AfiliadosService, private form: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    /* Capturar los datos del afiliado */
    this.activatedRoute.params.subscribe(( params )=>{
      this.idAfiliado = params["id"];
      this.afiliadosService.getItem(params["id"])
          .subscribe(( resp:any)=> {
            this.nombres.setValue(resp.nombres);
            this.apellidos.setValue(resp.apellidos);
            this.telefono.setValue(resp.telefono);
            this.area_laboral.setValue(resp.area_laboral);
            this.estado.setValue(resp.estado);
            this.tipo.setValue(resp.tipo);
          })
    })
  }
  saveAfiliado(){
    this.formSubmitted = true;

    if(this.f.invalid){
      return;
    }
    this.loadData = true;
    const dataAfiliado: Iafiliados = {
      apellidos: this.f.controls.apellidos.value,
      nombres: this.f.controls.nombres.value,
      displayName: `${this.f.controls.nombres.value} ${this.f.controls.apellidos.value}`,
      area_laboral: this.f.controls.area_laboral.value,
      estado: this.f.controls.estado.value,
      telefono: this.f.controls.telefono.value,
      tipo: this.f.controls.tipo.value,

    }
    /* Guardar en la base de datos la info del producto */
    this.afiliadosService.patchData(this.idAfiliado, dataAfiliado).subscribe(
      resp => {
        this.loadData = false;
        Swal.fire('Ok', 'El afiliado ha sido actualizado correctamente', "success").then(()=> this.router.navigate(['/panel/afiliados']));
      },
      err => {
        this.loadData = false;
        Swal.fire('Error', 'Error al actualizar el afiliado', "error");
      }
    )
  }
  invalidField(field:string){
    return functions.invalidField(field,this.f, this.formSubmitted)
  }

}

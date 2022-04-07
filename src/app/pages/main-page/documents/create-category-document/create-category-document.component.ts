import { Component, OnInit } from '@angular/core';
import { CategorydocumentService} from '../../../../services/categorydocument.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Icategoriasdocuments } from 'src/app/interfaces/Icategoriasdocuments';
import { functions } from 'src/app/helpers/functions';


import Swal from 'sweetalert2';


declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-create-category-document',
  templateUrl: './create-category-document.component.html',
  styleUrls: ['./create-category-document.component.css']
})
export class CreateCategoryDocumentComponent implements OnInit {


  public f = this.form.group({
    //nombreTipo: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚÑ]*')]],
    nombreTipo: ['', {
        validators: [Validators.required, Validators.pattern('[0-9a-zA-ZáéíóúÁÉÍÓÚÑ]*')],
        asyncValidators:[ this.isRepeatCategory()],
        updateOn:'blur'
    }],
    descripcionTipo: ['', [Validators.required]],
  });

  get nombreTipo(){ return this.f.controls.nombreTipo}
  get descripcionTipo(){ return this.f.controls.descripcionTipo}

  formSubmitted = false;

  constructor( private categorydocumentService: CategorydocumentService, private form:FormBuilder) { }

  ngOnInit(): void {
  }
  /* Funcion saveCategory */
  saveCategory(){
    this.formSubmitted = true;
    if(this.f.invalid){
      console.log(this.f);
      return;
    }

    const dataCategory: Icategoriasdocuments = {
      nombreTipo: this.f.controls.nombreTipo.value,
      descripcionTipo: this.f.controls.descripcionTipo.value,
    }
    /* Guardar en la base de datos el tipo */

    this.categorydocumentService.postData(dataCategory)
        .subscribe(resp  => {
          Swal.fire('Ok', 'Tipo del documento guardada correctamente', 'success');
        } , err => {
          Swal.fire('Error', 'Error al guardar', 'error');
        });

  }
  invalidField(field:string){
    return functions.invalidField(field, this.f, this.formSubmitted);
  }
  /* Validar que el nombre del tipo no se repita */
  isRepeatCategory(){
    return( control: AbstractControl) => {
      const name = control.value;
      return new Promise((resolve)=> {
        this.categorydocumentService.getFilterData("nombreTipo", name)
            .subscribe(
              resp => {

                if(Object.keys(resp).length > 0){
                  resolve({category: true });
                }else{
                  resolve({category: false });
                }

              }
            )
      })
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl,FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentsService } from 'src/app/services/documents.service';
import { CategorydocumentService } from 'src/app/services/categorydocument.service';
import { AfiliadosService } from 'src/app/services/afiliados.service';
import { functions } from 'src/app/helpers/functions';
import { Idocumentos } from 'src/app/interfaces/Idocumentos';
import { downloadArray } from '../upload-task/upload-task.component';

import Swal from 'sweetalert2';


declare var jQuery:any;
declare var $:any;


/*
  TODO: VALIDAR FRONTEND => BOTON DE GUARDADO (DIV DINAMICO) Y SECCION DE SUBIR DOCUMENTOS (DIV DINAMICO)


*/


export interface Departamentos{
  nombres: string;
  provincia: {};
}
export const DepartamentosGrupo: Departamentos[] = [];


declare var require:any;
@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit{

  public ubigeo = require('../../../../../../node_modules/ubigeo-peru/src/ubigeo-reniec.json');
  /*
    BLOQUE DE VARIABLES PARA SELECCIONAR LUGAR


  */
  public departamentosGrupo: Departamentos[] = DepartamentosGrupo;
  public departamentosGrupo1: Departamentos[] = DepartamentosGrupo;
    /*
    ==================================================================
     ==================================================================

    */
     /*
      Multiselect form

     */
      dropdownList = [];
      dropdownSettings = {};
      forms1: FormGroup;

    /*
    ====================================================
    */
   /*
    Drag and drop code block

   */
  isHovering: boolean;
  files: File[]=[];

  /*



  */

  public f = this.form.group({
    /* Denunciante */
    //nombreTipo: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚÑ]*')]],
    category: ['', [Validators.required]],
    nombreDirigente: ['', [Validators.required]],
    nombreDocumento: ['', {
        validators: [Validators.required],
        asyncValidators:[],
        updateOn:'blur'
    }],
    fechaDenuncia: ['', [Validators.required]],
    lugar: ['', [Validators.required]],
    /* Empresa */
    actividad: ['', [Validators.required]],
    numeroTrabajadoresAfectados: ['', [Validators.required]],
    lugarEmpresa:['', [Validators.required]],
    detalles:['']
  });

  get category(){ return this.f.controls.category}
  get nombreDirigente(){ return this.f.controls.nombreDirigente}
  get nombreDocumento(){ return this.f.controls.nombreDocumento}
  get fechaDenuncia(){ return this.f.controls.fechaDenuncia}
  get lugar(){ return this.f.controls.lugar}
  get actividad(){ return this.f.controls.actividad}
  get numeroTrabajadoresAfectados(){ return this.f.controls.numeroTrabajadoresAfectados}
  get lugarEmpresa(){ return this.f.controls.lugarEmpresa}
  get detalles(){ return this.f.controls.detalles}


  formSubmitted = false;

  loadData = false;

  categories:any = [];
  dirigentes:any = [];

  constructor(private documentsService: DocumentsService, private categorydocumentService: CategorydocumentService, private afiliadosService: AfiliadosService, private form:FormBuilder, public dialogRef: MatDialogRef<CreateDocumentComponent>) { }

  ngOnInit(): void {
        var lugar = {};
        for(var i in this.ubigeo){
          var country = this.ubigeo[i].Departamento;
          var state = this.ubigeo[i].Provincia;
          var city = this.ubigeo[i].Distrito;
          var obj = {};

          if(!lugar.hasOwnProperty(country)){
            obj[state] = [city];
            lugar[country] = obj;
          }
          else if(lugar[country].hasOwnProperty(state)){
            lugar[country][state].push(city);

          }
          else if(!lugar[country].hasOwnProperty(state)){
            lugar[country][state] = [city];
          }

        }
        for (let key in lugar) {
          if (lugar.hasOwnProperty(key)) {
              this.departamentosGrupo.push({
                nombres: key,
                provincia: Object.keys(lugar[key])
              });


            }
            if(this.departamentosGrupo.length > 25){
              this.departamentosGrupo = [];
            }
          }
          for (let key in lugar) {
            if (lugar.hasOwnProperty(key)) {
                this.departamentosGrupo1.push({
                  nombres: key,
                  provincia: Object.keys(lugar[key])
                })

              }
              if(this.departamentosGrupo1.length > 25){
                this.departamentosGrupo1 = [];
              }
            }
        console.log(this.departamentosGrupo);

        /* Capturamos la información los tipos de documento */
        this.categorydocumentService.getData()
            .subscribe(
              (resp : any) => {
                this.categories = Object.keys(resp).map(
                  a => ({
                    nombres: resp[a].nombreTipo
                  })
                )
              }
            )
         /* Capturamos la información de los dirigentes */
         this.afiliadosService.getData()
         .subscribe(
           (resp : any) => {
             let id = Object.keys(resp);

             var result = [];
             var counter = 0;


             id.map(a => {
                result.push({
                  id: a,
                  displayName: resp[a].displayName
                });
                if(resp[a].displayName != '' && resp[a].tipo == 'Dirigente'){
                  this.dirigentes.push({
                    nombres: resp[a].displayName
                  });
                }

             })
             result.filter((arr, index, self) => index === self.findIndex((t) => (t.displayName === arr.displayName && t.id === arr.id)));

             this.dropdownList = result;
              this.dropdownSettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'displayName',
                maxHeight: 200,
                selectAllText: 'Seleccionar todos',
                unSelectAllText: 'Deseleccionar todos',
                allowSearchFilter: true
               }
           }
         )

  }
  /* Funcion save document */
  saveDocument(){
    this.loadData = true;

    this.formSubmitted = true;

    if(this.f.invalid){
      return;
    }
    const dataDocuments: Idocumentos = {
      category:this.f.controls.category.value,
      nombreDirigente:this.f.controls.nombreDirigente.value,
      nombreDocumento:this.f.controls.nombreDocumento.value,
      fechaDenuncia: this.f.controls.fechaDenuncia.value,
      lugar:this.f.controls.lugar.value,
      actividad:this.f.controls.actividad.value,
      numeroTrabajadoresAfectados:this.f.controls.numeroTrabajadoresAfectados.value,
      lugarEmpresa:this.f.controls.lugarEmpresa.value,
      detalles:this.f.controls.detalles.value,
      files: downloadArray
    }

    /* Guardar en la base de datos de documentos */
    this.documentsService.postData(dataDocuments).subscribe(
      resp => {
        this.loadData = false;
        this.dialogRef.close('save');
        Swal.fire("Ok", "La informacion del documento ha sido enviado correctamente", "success");

      }, err => {
        Swal.fire("Error", "No se pudo enviar la información del documento", "error");
      }
    )

  }
  isRepeatDocument(){
    return( control: AbstractControl) => {
      const name = control.value;
      return new Promise((resolve)=> {
        this.documentsService.getFilterData("nombreDocumento", name)
            .subscribe(
              resp => {

                if(Object.keys(resp).length > 0){
                  resolve({document: true });
                }else{
                  resolve({document: false });
                }

              }
            )
      })
    }
  }
  invalidField(field: string){
    return functions.invalidField(field, this.f, this.formSubmitted);
  }

  onItemSelect($event){
    console.log('$event is ', $event);
  }

/* DRAG AND DROP FUNCTIONS */
toggleHover(event:boolean){
  this.isHovering = event;
}
onDrop(files: FileList){
  for(let i = 0; i< files.length; i++){
    this.files.push(files.item(i));
    console.log(files);
  }
}

/* */











}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { functions } from 'src/app/helpers/functions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AfiliadosService } from 'src/app/services/afiliados.service';

import Swal from 'sweetalert2';


declare var jQuery:any;
declare var $:any;

export interface IDialogData{
  id:string;
}


@Component({
  selector: 'app-approve-afiliado',
  templateUrl: './approve-afiliado.component.html',
  styleUrls: ['./approve-afiliado.component.css']
})
export class ApproveAfiliadoComponent implements OnInit {

  public f = this.form.group({
    // comment:['', [Validators.required,  Validators.pattern('[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\,\\.\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]]

  })

  get comment(){ return this.f.controls.comment }

  formSubmitted = false;

  loadData = false;

  dataEmail = {
    comment:'',
    url: '',
    address:'',
    name:''
  }

  visible = false;

  tipo = "";

  constructor( private form: FormBuilder,
                private afiliadosService: AfiliadosService,
                private http: HttpClient,
                public dialogRef: MatDialogRef<ApproveAfiliadoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void {
    this.afiliadosService.getItem(this.data.id).subscribe(
      (resp:any) => {

        this.tipo = resp.tipo;
        if(resp.estado =="Activo"){
          this.visible = true;

        }

        this.dataEmail.comment = resp.estado;
        this.dataEmail.address = resp.email;
        this.dataEmail.name = resp.displayName;
        this.dataEmail.url = '';
        console.log(this.dataEmail);

        //this.comment.setValue(JSON.parse(resp.feedback).comment);
      }
    )
  }
  /* Funcion para actualizar el afiliado */
  approveAfiliado(){
    this.loadData = true;

    this.formSubmitted = true;

    if(this.f.invalid){
      return;
    }
    let estado;

    if(this.visible){
      estado  = "Activo";
      if(this.tipo == "Invitado" || this.tipo == "Afiliado"){
        this.tipo = "Afiliado";
      }
    }else{
      estado = "Inhabilitado"
    }
    let data = {
      'estado':estado,
      'tipo': this.tipo
    }
    this.afiliadosService.patchData( this.data.id, data)
        .subscribe(
            resp => {

              /* ENVIAR NOTIFICACION AL AFILIADO, DIRIGENTE Y/O INVITADO AL CORREO ELECTRONICO */
              const formData = new FormData();
              formData.append('email', 'yes');
              formData.append('comment', `Su cuenta ha sido actualizada a estado ${this.dataEmail.comment} comuniquese con el dirigente si tiene dudas.`);
              formData.append('url',`${environment.domainSindicato}/panel/afiliados`);
              formData.append('address', this.dataEmail.address);
              formData.append('name',this.dataEmail.name);
              this.http.post(environment.urlEmail, formData).subscribe(
                (resp:any) => {
                  if(resp["status"] == 200){

                    this.loadData = false;
                    this.dialogRef.close('save');
                    Swal.fire('Ok', `Estado del afiliado actualizado correctamente, se le envió una notificación a la bandeja de entrada del participante ${this.dataEmail.name}`, 'success');
                  }else{
                    Swal.fire('Error', 'Error al enviar notificación al correo electronico', 'error');
                  }
                }
              );
            },
            err => {
              this.loadData = false;
              Swal.fire('Error', 'Ha fallado al actualizar el afiliado', 'error');
            }
        )
  }
  invalidField(field:string){
    return functions.invalidField(field, this.f, this.formSubmitted);
  }
  approve(event: MatSlideToggleChange, id: string){
    this.visible = event.checked;
    /*====================== */
  }

}

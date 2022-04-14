import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../../services/users.service';
import { MessageModel } from 'src/app/models/message.model';
import { AfiliadosService } from '../../../services/afiliados.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Email } from '../../../config';


import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  messages: MessageModel;
  isDisabled: boolean = true;
  nombres_ = "";
  apellidos_ = "";
  email_ = "";
  tipo_ ="";

  email:string = Email.url;


  dirigentes: any = [];

  constructor(private fb: FormBuilder, private userService: UsersService, private afiliadosService: AfiliadosService, private messagesService: MessagesService, private http: HttpClient ) {
    this.messages = new MessageModel();
  }

  ngOnInit(): void {
    /* Capturamos la información de los dirigentes */
    this.afiliadosService.getData()
    .subscribe(
      (resp : any) => {
        let id = Object.keys(resp);

        var result = [];
        var counter = 0;


        id.map(a => {
           if(resp[a].displayName != '' && resp[a].tipo == 'Dirigente'){
             this.dirigentes.push({
               id: a,
               nombres: resp[a].displayName,
               departamento: resp[a].departamento,
               email: resp[a].email
             });
           }

        })
      })
      this.userService.authActivate().then( resp => {
        if(!resp){
          Swal.fire('Error', "Por favor inicie sesion para enviar una consulta a la organizacion", null);
        }else{
            this.userService.getFilterData("idToken", localStorage.getItem("idToken"))
                .subscribe( resp => {
                  for(const i in resp){

                    this.nombres_ = resp[i].nombres;
                    this.apellidos_ = resp[i].apellidos;
                    this.email_ = resp[i].email;
                    this.tipo_ = resp[i].tipo
                  }
                })
        }
      });


  }
  newQuestion(message, dirigente ){

      this.messages.message = message.value;
      this.messages.dirigente = dirigente.options[dirigente.selectedIndex].childNodes[0].data;
      this.messages.id_dirigente = dirigente.value;



      /* Validar si el usuario está autenticado */
      this.userService.authActivate().then( resp => {
        if(!resp){
          Swal.fire('Error', "Por favor inicie sesion para enviar una consulta a la organizacion", null);
        }else{
            this.userService.getFilterData("idToken", localStorage.getItem("idToken"))
                .subscribe( resp => {

                  for(const i in resp){

                    let emailDirigente = null;

                    this.userService.getFilterData("email", dirigente.options[dirigente.selectedIndex].childNodes[3].data)
                    .subscribe( resp1 => {
                      console.log(resp1);
                      for (const i in resp1){
                        emailDirigente = resp1[i].email;
                      }
                    });

                    this.messages.nombres = resp[i].nombres;
                    this.messages.apellidos = resp[i].apellidos;
                    this.messages.email = resp[i].email;
                    this.messages.tipo = resp[i].tipo;
                    this.messages.date_message = new Date();
                    /* Crear el mensaje en la base de datos */
                    this.messagesService.registerDatabase( this.messages, localStorage.getItem("idToken"))
                    .subscribe( resp => {

                      if(resp["nombres"] != "" && resp["apellidos"] != "" && resp["email"] != "" && resp["tipo"] != "") {

                        const formData = new FormData();
                        formData.append('email', 'yes');
                        formData.append('comment', 'Has recibido un nuevo mensaje');
                        formData.append('address', emailDirigente);
                        formData.append('url', 'localhost:4000');
                        formData.append('name', dirigente.options[dirigente.selectedIndex].childNodes[0].data);

                        this.http.post(this.email, formData)
                            .subscribe( resp => {
                              if(resp["status"] == 200){

                                Swal.fire("Ok", "El mensaje ha sido enviado correctamente, espere la respuestas a su petición", 'success');
                              }
                        })


                      }
                    }, err => {
                      Swal.fire("Error", err.error);
                      console.log(err);
                    })
                  }
                })
        }
      });
  }


}

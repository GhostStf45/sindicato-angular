import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard-afiliados',
  templateUrl: './dashboard-afiliados.component.html',
  styleUrls: ['./dashboard-afiliados.component.css']
})
export class DashboardAfiliadosComponent implements OnInit {


  authValidate:boolean = false;


  formSubmitted = false;

  loadData = false;

  idAfiliado = "";

  documentos = [];


  chart = {
    title:"Documentos por tipo",
    type:"AreaChart",
    data: [
      [ 'London', 8234565],
      [ 'New York', 4234565],
      [ 'Paris', 8134565],
      [ 'Berlin', 6234565],
      [ 'Kairo', 534565],
    ],
    columnNames:['Date', 'Total'],
    options:{colors: ['#FFC107']}
  }


  /* Rangos de fechas */

  startDate =  new Date(new Date().getFullYear(),0,1);
  endDate = new Date();

  constructor(private documentsService: DocumentsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.getDataDocuments();
    console.log("startDate", this.startDate);
  }
  getDataDocuments(){

    this.usersService.authActivate().then( resp => {
      if(resp){
        this.authValidate =true;
        this.usersService.getFilterData("idToken", localStorage.getItem("idToken"))
            .subscribe( resp => {
              for( const i in resp){

                  this.idAfiliado = Object.keys(resp).toString();
                  console.log(this.idAfiliado);
                  this.documentsService.getData()
                  .subscribe((resp: any) => {
                    /* */
                      let position = Object.keys(resp).length;
                      this.documentos = Object.keys(resp).map( a => {
                        for( var i = 0; i < resp[a].numeroTrabajadoresAfectados.length; i++){
                          if(resp[a].numeroTrabajadoresAfectados[i]['id'] == this.idAfiliado){
                            console.log(resp[a].nombreDocumento);
                            console.log(resp[a].files);
                          }

                        }
                      })



                  })


              }
            });
      }
    });
  }

}

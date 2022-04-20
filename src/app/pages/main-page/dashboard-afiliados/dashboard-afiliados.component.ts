import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { UsersService } from 'src/app/services/users.service';
import { Chart,DoughnutController, BarController, BarElement, PointElement, LinearScale, Title, CategoryScale, ArcElement, Tooltip,
  LineElement, PolarAreaController, RadialLinearScale, TimeScale, Legend  } from 'node_modules/chart.js';
import 'chartjs-adapter-date-fns';

  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
import { functions } from 'src/app/helpers/functions';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ExporterService } from '../../../services/exporter.service';

/* Librerias para la seccion de mensajes */
import {HttpClient} from "@angular/common/http";
import { NgForm } from '@angular/forms';
import { Email } from '../../../config';
import { MessageModel } from 'src/app/models/message.model';
import { MessagesService } from '../../../services/messages.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';


import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;



@Component({
  selector: 'app-dashboard-afiliados',
  templateUrl: './dashboard-afiliados.component.html',
  styleUrls: ['./dashboard-afiliados.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class DashboardAfiliadosComponent implements OnInit {


  chart: any =[];
  chartBar: any = [];

  authValidate:boolean = false;
  formSubmitted = false;
  loadData = false;
  idAfiliado = "";

  displayedColumns: string[] = ['position',	'nombreDocumento', 'category', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  screenSizeSM = false;

  tipo: string = "";

  documentos = [];
  expandedElement: [] | null;

  public contador = 0;


  /* Fechas */
  dataDates: any[] = [];
  dataDatesCount: any[] = [];

  /*


  */

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  /* Rangos de fechas */

  startDate:any;
  endDate:any;



  /*
    Variables para el listado de mensajes


  */

    messages:any[] = [];
    idMessage:any[] = [];
    message: MessageModel;
    uniqueIdMessage:string;
    userMessage:any[] = [];
    email:string = Email.url;


  /*======================================= */

  constructor(private documentsService: DocumentsService,
    private usersService: UsersService,
    private exporterService: ExporterService,
    private messagesService: MessagesService,
    private http: HttpClient) {
    Chart.register(DoughnutController,BarController, BarElement,
      PointElement, LinearScale, Title, CategoryScale,
      ArcElement, Tooltip,LineElement, PolarAreaController,
      RadialLinearScale, TimeScale, Legend  );
    this.message = new MessageModel();
   }

  ngOnInit(): void {
    this.getDataDocuments();

    if(functions.screenSize(0,767)){
      this.screenSizeSM = true;
    }else{
      this.screenSizeSM = false;
      this.displayedColumns.splice(3,0,'url')

    }
    this.tipo = localStorage.getItem('tipo');

    let load= 0;

    /* Preguntamos si el dirigente tiene mensajes */
    this.messagesService.getFilterData("dirigente", localStorage.getItem("displayName"))
        .subscribe( resp => {
          if(Object.keys(resp).length > 0){
            for(const i in resp){
              load++;
              this.messages.push(resp[i]);
              this.idMessage.push(i);
              /* Traemos el usuario del mensaje*/
              this.usersService.getFilterData("email", resp[i].email)
                .subscribe( resp => {
                  if(Object.keys(resp).length > 0){
                    for (const i in resp){
                      this.userMessage.push(resp[i]);
                    }
                  }
                })
            }
          }
        })
    this.getDataDocumentsByDate();

    //console.log("startDate", this.startDate);
  }
  getDataDocuments(){
    this.idAfiliado = localStorage.getItem("id");
    this.documentsService.getData()
    .subscribe((resp?: any) => {
      var data:any = [];
      var locallabel: any = [];
      var dataset_ = []
      var dataset1 = [];
      let resultado;
      let resultadoDates;
      let resultado1 =[];
      let locallabel1 = [];

      let nombreDoc = [];
      let path1=[];
      let url1 = [];



        Object.keys(resp).map( (a, index) => {
          for( var i = 0; i < resp[a].numeroTrabajadoresAfectados.length; i++){
              if(resp[a].numeroTrabajadoresAfectados[i]['id'] == this.idAfiliado){
                  data = resp[a].files.length;
                  locallabel = resp[a].category;
                  dataset_ = [resp[a].category, resp[a].files.length];
                  dataset1.push([resp[a].category, resp[a].files.length]);
                  for( var j = 0; j < resp[a].files.length; j++){
                   url1.push( resp[a].files[i]);
                    this.contador ++ ;
                    // nombreDoc.push(resp[a].nombreDocumento);
                    // categorias1.push(resp[a].category);
                    let position = 1;
                    this.documentos = Object.keys(resp).map((a, index) =>({
                        position: position++,
                        nombreDocumento: resp[a].nombreDocumento,
                        category: resp[a].category,
                        url: url1[i]['downloadUrl'],

                    }))
                    this.dataSource = new MatTableDataSource(this.documentos);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                  }
                }

              }
        })
        resultado = Object.values(dataset1.reduce((c, v) => {
          if (c[v[0]])
          {
            c[v[0]][1] += v[1];     //Add the first element if already exist
          }
          else
          {
            c[v[0]] = v;                    //Assign the value if does not exist
          }
          return c;
        }, {}));

        for(var k = 0; k < resultado.length; k++){
          for(var l = 0; l < resultado[k].length; l++){
            locallabel1.push(resultado[k].splice(l,1));
          }
          resultado1.push(resultado[k]);
        }

        this.chart = new Chart('canvas',{
          type: 'doughnut',
          data: {
            labels: locallabel1,
            datasets: [
              {
                label: '# de documentos por tipo',
                data: resultado1,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
              }
            ]
          },
          options : {
            responsive: true,
            plugins: {
              legend: {
                display: true
              }


            },
            maintainAspectRatio: false,


          }
        })
    })

  }
  getDataDocumentsByDate(){
    this.idAfiliado = localStorage.getItem("id");
    this.documentsService.getDataByDate(functions.formatDate(this.startDate), functions.formatDate(this.endDate))
    .subscribe((resp?: any) => {
         /*
       variables para el filtro de fechas
      */

       var dataset2 = [];

       let resultadoDates;
       /*
       ===================================
       ===================================
       */
        Object.keys(resp).map( (a, index) => {
          for( var i = 0; i < resp[a].numeroTrabajadoresAfectados.length; i++){
              if(resp[a].numeroTrabajadoresAfectados[i]['id'] == this.idAfiliado){
                  /*
                    FECHAS

                  */
                    dataset2.push([moment(resp[a].fechaDenuncia).format('YYYY-MM-DD'), resp[a].files.length]);
                }

              }
        })
        resultadoDates = Object.values(dataset2.reduce((c, v) => {
          if (c[v[0]])
          {
            c[v[0]][1] += v[1];     //Add the first element if already exist
          }
          else
          {
            c[v[0]] = v;                    //Assign the value if does not exist
          }
          return c;
        }, {}));

        for(var k = 0; k < resultadoDates.length; k++){
          for(var l = 0; l < resultadoDates[k].length; l++){
            this.dataDates.push(resultadoDates[k].splice(l,1));
          }
          this.dataDatesCount.push(resultadoDates[k]);
        }

        this.chartBar = new Chart('barra',{
          type: 'bar',
          data: {
            labels: this.dataDates,
            datasets: [
              {
                data: this.dataDatesCount,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
              }
            ]
          },
          options : {
            responsive: true,
            plugins: {
              legend: {
                display: true
              }
            },
            scales: {
              y:{
                beginAtZero:true
              },
              x: {
                stacked: false,
                reverse: true // ADD THIS LINE
              },
            }


          }
        })
    }, err => { console.log(err);})
  }
  resetNameValues(){
    this.dataDates = [];
    this.dataDatesCount = [];
    this.startDate = '';
    this.endDate = '';
    $('#barra').remove();
    $('#chartBase').append('<canvas id="barra"></canvas>');
  }
  /* Filtro de busqueda */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

    }
  }
  exportXLSX(){
    this.exporterService.exportToExcel(this.dataSource.data, 'tusdocumentos');
  }
  /* ==========================RESPONDER MENSAJE  ========================== */
  answerMessage(idMessage){
    this.uniqueIdMessage = idMessage;
    $("#answerMessage").modal();
  }
  onSubmit(f: NgForm){
    if(f.invalid){
      Swal.fire("Error", "Peticion invalida", "error");
      return;
    }

    let body = {
      date_answer: new Date(),
      answer: this.message.answer
    }
    this.messagesService.patchDataAuth(this.uniqueIdMessage, body, localStorage.getItem("idToken")).subscribe( resp => {
      if(resp["email"] != ""){
        const formData = new FormData();
        formData.append('email', 'yes');
        formData.append('comment', "Has recibido un actualizacion en tu mensaje al dirigente");
        formData.append('address', this.userMessage[0].email);
        formData.append('name', this.userMessage[0].displayName);
        formData.append('url', 'localhost');

        this.http.post( this.email, formData)
            .subscribe( resp1 => {
              if(resp1["status"] == 200){
                Swal.fire("Ok", "El mensaje ha sido respondido", "success");
              }
            })
      }
    }, err => {
      Swal.fire("error", err.error.error.message, "error");
    })
  }
}

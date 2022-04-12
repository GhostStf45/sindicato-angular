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

  documentos = [];
  expandedElement: [] | null;

  public contador = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  /* Rangos de fechas */

  startDate =  new Date(new Date().getFullYear(),0,1);
  endDate = new Date();

  constructor(private documentsService: DocumentsService, private usersService: UsersService, private exporterService: ExporterService) {
    Chart.register(DoughnutController,BarController, BarElement, PointElement, LinearScale, Title, CategoryScale, ArcElement, Tooltip,LineElement, PolarAreaController, RadialLinearScale, TimeScale, Legend  );
   }

  ngOnInit(): void {
    this.getDataDocuments();

    if(functions.screenSize(0,767)){
      this.screenSizeSM = true;
    }else{
      this.screenSizeSM = false;
      this.displayedColumns.splice(3,0,'url')

    }

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
      let resultado1 =[];
      let locallabel1 = [];

      let nombreDoc = [];
      let path1=[];
      let url1 = [];

      /*
       variables para el filtro de fechas
      */
      const dateLabels = ['2021-08-25', '2021-08-26', '2021-08-27', '2021-08-28', '2021-08-29', '2021-08-30', '2021-08-31'];
      const datapoints = [1,2,3,4,5,6,7];
       /*
       ===================================
       ===================================
       */


        Object.keys(resp).map( (a, index) => {
          for( var i = 0; i < resp[a].numeroTrabajadoresAfectados.length; i++){
              if(resp[a].numeroTrabajadoresAfectados[i]['id'] == this.idAfiliado){
                  data = resp[a].files.length;
                  locallabel = resp[a].category;
                  dataset_ = [resp[a].category, resp[a].files.length];
                  dataset1.push([resp[a].category, resp[a].files.length]);
                  for( var j = 0; j < resp[a].files.length; j++){
                    url1.push( resp[a].files[i]['downloadUrl']);
                    this.contador ++ ;
                    // nombreDoc.push(resp[a].nombreDocumento);
                    // categorias1.push(resp[a].category);
                    let position = 1;
                    this.documentos = Object.keys(resp).map((a, index) =>({
                        position: position++,
                        nombreDocumento: resp[a].nombreDocumento,
                        category: resp[a].category,
                        url: url1[index++],

                    }))
                    this.dataSource = new MatTableDataSource(this.documentos);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                  }
                }

              }
        })
        console.log(this.documentos);


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

        //this.documentos = [...this.documentos];

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
        console.log(this.chart);

        /* Grafico de documentos personalizado por fechas */
        this.chartBar = new Chart('barra',{
          type: 'bar',
          data: {
            labels: dateLabels,
            datasets: [
              {
                data: datapoints,
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
              }
            }


          }
        })

    })

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
}

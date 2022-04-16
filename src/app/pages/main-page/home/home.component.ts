import { Component, OnInit } from '@angular/core';
import { Chart,DoughnutController, BarController, BarElement, PointElement, LinearScale, Title, CategoryScale, ArcElement, Tooltip,
  LineElement, PolarAreaController, RadialLinearScale, TimeScale, Legend  } from 'node_modules/chart.js';
import 'chartjs-adapter-date-fns';

import { functions } from 'src/app/helpers/functions';
import {animate, state, style, transition, trigger} from '@angular/animations';



import {ExporterService } from '../../../services/exporter.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { AfiliadosService } from 'src/app/services/afiliados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class HomeComponent implements OnInit {

  chart: any =[];
  latestAfiliados: any = [];

  contadorAfiliados = 0;
  contadorDocumentos = 0;

  constructor(private afiliadosService: AfiliadosService, private exporterService: ExporterService, private documentsService: DocumentsService) {
    Chart.register(DoughnutController,BarController, BarElement, PointElement, LinearScale, Title, CategoryScale, ArcElement, Tooltip,LineElement, PolarAreaController, RadialLinearScale, TimeScale, Legend  );
  }

  ngOnInit(): void {
    this.getDataAfiliados();
    this.getDataDocuments();
    this.lastAfiliados();
  }
  getDataAfiliados(): void{
    this.afiliadosService.getData()
    .subscribe((resp?: any) => {


      var contadorlocal = 0;
      /* Variables pora grafico de estado de afiliados*/
      var arrayAfiliados = [];
      var arrayEstado = [];
      var datasetAfiliados = [];
      var newDataSet = [];
      var labelEstado = [];
      var numeroAfiliados = [];
      /* ================================================*/


      var arrayAfiliadosDepartamento = [];
      var arrayDepartamentos = [];
      var datasetAfiliadosDepartamento = [];
      var newDataSetDepartamento = [];

      var labelDepartamento = [];
      var numeroAfiliadosDepartamento = [];


      Object.keys(resp).map( a => {

        if(resp[a].estado != 'En espera'){
          contadorlocal++;
          arrayAfiliados.push(resp[a].displayName);
          arrayEstado.push(resp[a].estado);

        }
        if(resp[a].departamento != undefined && resp[a].departamento != "" && resp[a].estado != 'En espera' && resp[a].tipo != 'Invitado'){
          arrayDepartamentos.push(resp[a].departamento);
          arrayAfiliadosDepartamento.push(resp[a].displayName);
        }

      })
      /* Convertir a array de json */
      for(var i = 0; i< arrayAfiliados.length; i++){
        datasetAfiliados.push({
          nombres: arrayAfiliados[i],
          estado: arrayEstado[i]
        });
      }
      for(var j = 0; j<arrayAfiliadosDepartamento.length; j++){
        datasetAfiliadosDepartamento.push({
          nombres: arrayAfiliadosDepartamento[j],
          departamento: arrayDepartamentos[j]
        });
      }




      /* Contar afiliados por estado */
      newDataSet = datasetAfiliados.reduce((acc, cur) => {
        acc[cur.estado] = (acc[cur.estado] || 0) + 1
        return acc;
     }, {});

     newDataSetDepartamento = datasetAfiliadosDepartamento.reduce((acc, cur) => {
      acc[cur.departamento] = (acc[cur.departamento] || 0) + 1
      return acc;
   }, {});


     /* Datos para la grafica de doughnut de estado  */
     Object.keys(newDataSet).map( a => {
      labelEstado.push(a);
       numeroAfiliados.push(newDataSet[a]);
     });
     /* Datos para la grafica polar de afiliados por departamento */

     Object.keys(newDataSetDepartamento).map( a => {
      labelDepartamento.push(a);
      numeroAfiliadosDepartamento.push(newDataSetDepartamento[a]);
     });

     /* Grafico de afiliados*/
     this.chart = new Chart('departamentosGrafica',{
      type: 'polarArea',
      data: {
        labels: labelDepartamento,
        datasets: [
          {
            label: '# de documentos por tipo',
            data: numeroAfiliadosDepartamento,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ]
          }
        ]
      },
      options : {
        responsive: true,
        plugins: {
          legend:{
              display: true,
          },

        }
      }
    })


      /* Grafico de afiliados*/
      this.chart = new Chart('canvas',{
        type: 'doughnut',
        data: {
          labels: labelEstado,
          datasets: [
            {
              label: '# de documentos por tipo',
              data: numeroAfiliados,
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
            legend:{
                display: true,
            },

          },
          maintainAspectRatio: false,
        }
      })
      this.contadorAfiliados = contadorlocal;


    })

  }
  getDataDocuments(){
    this.documentsService.getData()
        .subscribe( (resp?: any) => {
          var dataset = [];
          var resultado;
          var contador = 0;

          var arrayCategory = [];
          var arrayFiles = [];
          Object.keys(resp).map( (a, index) => {

              if(resp[a]['files'] != undefined){
                dataset.push([resp[a]['category'], resp[a]['files'].length]);
                for(var i=0; i<resp[a]['files'].length; i++){
                  contador ++;
                }

              }
              // arrayCategoria.push([{
              //   category : resp[a],
              //   files: resp[a].files
              // }]);



          });

          resultado = Object.values(dataset.reduce((c, v) => {
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

          console.log(resultado);

          for(var k = 0; k < resultado.length; k++){
            for(var l = 0; l < resultado[k].length; l++){
              arrayCategory.push(resultado[k].splice(l,1));
            }
            arrayFiles.push(resultado[k]);
          }


          this.chart = new Chart('barra',{
            type: 'bar',
            data: {
              labels: arrayCategory,
              datasets: [
                {
                  data: arrayFiles,
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

          this.contadorDocumentos = contador;
        })
  }
  lastAfiliados(){
    this.afiliadosService.getLatesData()
        .subscribe(( resp: any) => {
            Object.keys(resp).map( (a, i)=>{
              this.latestAfiliados[i] = {}
              this.latestAfiliados[i] = {
                "displayName": resp[a].displayName,
                "tipo": resp[a].tipo,
                "estado": resp[a].estado,
                "fecha_registro":resp[a].fecha_incripcion
              }
            })
            console.log(this.latestAfiliados);
        })
  }

}

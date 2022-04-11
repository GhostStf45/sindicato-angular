import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { UsersService } from 'src/app/services/users.service';
import { Chart,DoughnutController, BarController, BarElement, PointElement, LinearScale, Title, CategoryScale, ArcElement, Tooltip,
  LineElement, PolarAreaController, RadialLinearScale, TimeScale, Legend  } from 'node_modules/chart.js';



@Component({
  selector: 'app-dashboard-afiliados',
  templateUrl: './dashboard-afiliados.component.html',
  styleUrls: ['./dashboard-afiliados.component.css']
})
export class DashboardAfiliadosComponent implements OnInit {


  chart: any =[];

  authValidate:boolean = false;


  formSubmitted = false;

  loadData = false;

  idAfiliado = "";

  documentos = [];
  labels =  [];



  // chart: any = {
  //   title:"Documentos por tipo",
  //   type:"PieChart",
  //   data: [] ,
  //   columnNames:["Tipo documentos", "Total"],
  //   options: {}
  // }

  // single: any[];
  // view: any[] = [700, 400];

  // options
  // gradient: boolean = true;
  // showLegend: boolean = true;
  // showLabels: boolean = true;
  // isDoughnut: boolean = false;
  // legendPosition: string = 'below';

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  /* Rangos de fechas */

  startDate =  new Date(new Date().getFullYear(),0,1);
  endDate = new Date();

  constructor(private documentsService: DocumentsService, private usersService: UsersService) {
    Chart.register(DoughnutController,BarController, BarElement, PointElement, LinearScale, Title, CategoryScale, ArcElement, Tooltip,LineElement, PolarAreaController, RadialLinearScale, TimeScale, Legend  );
   }

  ngOnInit(): void {
    this.getDataDocuments();

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
        // this.documentos = Object.keys(resp).forEach( key => {
        //   Object.values(resp[key].numeroTrabajadoresAfectados).map((key1, index1)=>{
        //     if(key1['id'] == this.idAfiliado){
        //       data = [resp[key].category, resp[key].files.length];
        //     }
        //   });
        // });

        Object.keys(resp).map( a => {
          for( var i = 0; i < resp[a].numeroTrabajadoresAfectados.length; i++){
            if(resp[a].numeroTrabajadoresAfectados[i]['id'] == this.idAfiliado){
                data = resp[a].files.length;
                locallabel = resp[a].category;

                dataset_ = [resp[a].category, resp[a].files.length];
                dataset1.push([resp[a].category, resp[a].files.length]);


                // contador++;
                //console.log(resp[a].files[j]['downloadUrl']);
                // console.log(resp[a].fechaDenuncia);
                // console.log(resp[a].category);
                //console.log(dataset_);
                this.documentos.push(data);
                this.labels.push(locallabel);
              }

            }

          }
          )

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


          }
        })
        console.log(this.chart);
        // this.chart.data.push(this.documentos);

        //this.documentos = [...  this.documentos];

        //console.log('2',this.chart.data);
    })

  }

  // onSelect(data): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Iafiliados } from '../../../interfaces/Iafiliados';
import { AfiliadosService } from '../../../services/afiliados.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { functions } from '../../../helpers/functions';
import {ExporterService } from '../../../services/exporter.service';

import { ApproveAfiliadoComponent } from './approve-afiliado/approve-afiliado.component';

/*
  TODO : TERMINAR LA APROBACIÓN DE LOS AFILIADOS Y/O PARTICIPANTES VIDEO UDEMY 137



*/

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class AfiliadosComponent implements OnInit {


  /*  */
  afiliadosFiltro = {}

   /* Varaible para nombrar las columnas de la tabla de Angular Material */

   displayedColumns: string[] =['position', 'displayName', 'area_laboral', 'estado', 'tipo', 'acciones']

  /* Varaible que instanciará la data que aparecerá en la tabla */

  dataSource!: MatTableDataSource<Iafiliados>;

  /* Arreglo de afiliados */
  afiliados: Iafiliados[] = [];

  expandedElement!: Iafiliados | null;

  screenSizeSM = false;

   /* Variable para saber cuando finaliza la carga de los datos */

   loadData = false;

   /* Paginador */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   /* Paginación y orden */

  @ViewChild(MatSort) sort: MatSort;

  // filterSelectObj = [];

  constructor( private afiliadosService: AfiliadosService, private exporterService: ExporterService) {

    // Object to create Filter for
  //   this.filterSelectObj = [
  //     {
  //       name: 'Estado',
  //       columnProp: 'estado',
  //       options: []
  //     }, {
  //       name: 'Area Laboral',
  //       columnProp: 'area_laboral',
  //       options: []
  //     }
  //   ]
  //
  }

  ngOnInit(): void {

    this.getData();

    if(functions.screenSize(0,767)){
      this.screenSizeSM = true;
    }else{
      this.screenSizeSM = false;
      this.displayedColumns.splice(3,0,'dni');
      this.displayedColumns.splice(5,0,'email');
      this.displayedColumns.splice(7,0,'telefono');
      this.displayedColumns.splice(8,0,'fecha_inscripcion');
    }

  }

  // Get Uniqu values from columns to build filter
  // getFilterObject(fullObj, key) {
  //   const uniqChk = [];
  //   fullObj.filter((obj) => {
  //     if (!uniqChk.includes(obj[key])) {
  //       uniqChk.push(obj[key]);
  //     }
  //     return obj;
  //   });
  //   return uniqChk;
  // }



  getData(): void {
    this.loadData = true;
    this.afiliadosService.getData()
        .subscribe( (resp:any) => {
          let position = 1;
         this.afiliados = Object.keys(resp).map( a => ({
            id:a,
            position: position++,
            apellidos: resp[a].apellidos,
            nombres: resp[a].nombres,
            displayName: resp[a].displayName,
            area_laboral: resp[a].area_laboral,
            dni: resp[a].dni,
            email: resp[a].email,
            estado: resp[a].estado,
            fecha_inscripcion: resp[a].fecha_incripcion,
            telefono: resp[a].telefono,
            tipo: resp[a].tipo,

          } as Iafiliados));


          /* Vincular la información de la interfaz */
          this.dataSource = new MatTableDataSource(this.afiliados);



          // // Overrride default filter behaviour of Material Datatable
          //   this.dataSource.filterPredicate = this.createFilter();

          // this.filterSelectObj.filter((o) => {
          //   o.options = this.getFilterObject(this.dataSource.data, o.columnProp);
          // });

          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;


          this.loadData = false;

        });

  }
  exportXLSX(){
      this.exporterService.exportToExcel(this.dataSource.data, 'afiliados');
  }
  // Called on Filter change
  filterChange(filter, event) {
    //let filterValues = {}
    this.afiliadosFiltro[filter.columnProp] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.afiliadosFiltro);
  }
  // Custom filter method fot Angular Material Datatable
  // createFilter() {
  //   let filterFunction = function (data: any, filter: string): boolean {
  //     let searchTerms = JSON.parse(filter);
  //     let isFilterSet = false;
  //     for (const col in searchTerms) {
  //       if (searchTerms[col].toString() !== '') {
  //         isFilterSet = true;
  //       } else {
  //         delete searchTerms[col];
  //       }
  //     }

  //     console.log(searchTerms);

  //     let nameSearch = () => {
  //       let found = false;
  //       if (isFilterSet) {
  //         for (const col in searchTerms) {
  //           searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
  //             if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
  //               found = true
  //             }
  //           });
  //         }
  //         return found
  //       } else {
  //         return true;
  //       }
  //     }
  //     return nameSearch()
  //   }
  //   return filterFunction
  // }
  //  // Reset table filters
  //  resetFilters() {
  //   this.afiliadosFiltro = {}
  //   this.filterSelectObj.forEach((value, key) => {
  //     value.modelValue = undefined;
  //   })
  //   this.dataSource.filter = "";
  // }
   /* Filtro de busqueda */
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

    }
  }

  exportAsXLSX():void{

  }


}

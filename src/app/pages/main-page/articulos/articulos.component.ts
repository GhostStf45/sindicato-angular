import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticulosService } from '../../../services/articulos.service';
import { Iarticulos } from '../../../interfaces/Iarticulos';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { functions } from '../../../helpers/functions';
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ArticulosComponent implements OnInit {


  /*  */
  articulosFiltro = {}

   /* Varaible para nombrar las columnas de la tabla de Angular Material */

   displayedColumns: string[] =['position', 'ARTICULO', 'CONTENIDO', 'DECRETO', 'TIPO', 'similarity_score', 'palabras_clave', 'acciones']

  /* Varaible que instanciará la data que aparecerá en la tabla */

  dataSource!: MatTableDataSource<Iarticulos>;

  /* Arreglo de articulos */
  articulos: Iarticulos[] = [];

  expandedElement!: Iarticulos | null;

  screenSizeSM = false;

   /* Variable para saber cuando finaliza la carga de los datos */

   loadData = false;

   /* Paginador */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   /* Paginación y orden */

  @ViewChild(MatSort) sort: MatSort;

  constructor(private articulosService: ArticulosService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loadData = true;
    this.articulosService.getData()
        .subscribe( (resp:any) => {
          let position = 1;
          console.log(resp);
         this.articulos = Object.keys(resp).map( a => ({
            id:a,
            position: position++,
            ARTICULO: resp[a].ARTICULO,
            DECRETO: resp[a].DECRETO,
            CONTENIDO: resp[a].CONTENIDO,
            palabras_clave: resp[a].palabras_clave,
            TIPO: resp[a].TIPO,
            similarity_score: resp[a].similarity_score


          } as Iarticulos));


          /* Vincular la información de la interfaz */
          this.dataSource = new MatTableDataSource(this.articulos);



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
  filterChange(filter, event) {
    //let filterValues = {}
    this.articulosFiltro[filter.columnProp] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.articulosFiltro);
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

}

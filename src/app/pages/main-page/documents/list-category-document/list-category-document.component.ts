import { Component, OnInit, ViewChild } from '@angular/core';

import { Icategoriasdocuments } from '../../../../interfaces/Icategoriasdocuments';
import { CategorydocumentService } from '../../../../services/categorydocument.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { functions } from '../../../../helpers/functions';
import {ExporterService } from '../../../../services/exporter.service';

@Component({
  selector: 'app-list-category-document',
  templateUrl: './list-category-document.component.html',
  styleUrls: ['./list-category-document.component.css']
})
export class ListCategoryDocumentComponent implements OnInit {

   /*  */
   categoriesFiltro = {}

   /* Varaible para nombrar las columnas de la tabla de Angular Material */

   displayedColumns: string[] =['position', 'Nombre', 'Descripción', 'acciones']

  /* Varaible que instanciará la data que aparecerá en la tabla */

  dataSource!: MatTableDataSource<Icategoriasdocuments>;

  /* Arreglo de categories */
  categories: Icategoriasdocuments[] = [];

  //expandedElement!: Icategoriasdocuments | null;

  screenSizeSM = false;

   /* Variable para saber cuando finaliza la carga de los datos */

   loadData = false;

   /* Paginador */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   /* Paginación y orden */

  @ViewChild(MatSort) sort: MatSort;


  constructor(private categoriesService: CategorydocumentService, private exporterService: ExporterService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();


  }

  getData(): void {
    this.loadData = true;
    this.categoriesService.getData()
        .subscribe( (resp:any) => {
          let position = 1;
         this.categories = Object.keys(resp).map( a => ({
            id:a,
            position: position++,
            nombreTipo: resp[a].nombreTipo,
            descripcionTipo: resp[a].descripcionTipo,

          } as Icategoriasdocuments));


          /* Vincular la información de la interfaz */
          this.dataSource = new MatTableDataSource(this.categories);

          console.log(this.dataSource);

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

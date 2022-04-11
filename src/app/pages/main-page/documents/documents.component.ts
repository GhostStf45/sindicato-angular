import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategorydocumentService} from '../../../services/categorydocument.service';
import { DocumentsService } from 'src/app/services/documents.service';

import { CreateCategoryDocumentComponent } from './create-category-document/create-category-document.component';
import { ListCategoryDocumentComponent } from './list-category-document/list-category-document.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import {ExporterService } from '../../../services/exporter.service';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Idocumentos } from 'src/app/interfaces/Idocumentos';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { functions } from 'src/app/helpers/functions';


/*
TODO: AÑADIR LA SECCION DE MODIFICACION DE DOCUMENTOS


*/


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class DocumentsComponent implements OnInit {

  displayedColumns: string[] = ['position',
                                'nombreDocumento',
                                'acciones'];

  dataSource!: MatTableDataSource<Idocumentos>;


  documentos: Idocumentos[] = [];

  expandedElement: Idocumentos | null;

  screenSizeSM = false;


  loadData = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(  private exporterService: ExporterService, private categorydocumentService: CategorydocumentService, public dialog: MatDialog, private documentsService: DocumentsService) { }

  ngOnInit(): void {
    this.getData();
    if(functions.screenSize(0,767)){
        this.screenSizeSM = true;
    }else{
      this.screenSizeSM = false;
      this.displayedColumns.splice(2,0,'actividad')
      this.displayedColumns.splice(3,0,'category')
      this.displayedColumns.splice(4,0,'detalles')
      this.displayedColumns.splice(5,0,'fechaDenuncia')
      this.displayedColumns.splice(6,0,'lugar')
      this.displayedColumns.splice(7,0,'lugarEmpresa')
      this.displayedColumns.splice(8,0,'nombreDirigente')

    }

    console.log(this.expandedElement);
  }
  getData(){
    this.loadData = true;
    this.documentsService.getData()
        .subscribe((resp: any) => {
          /* */
            let position = Object.keys(resp).length;
            this.documentos = Object.keys(resp).map( a => ({
              id: a,
              position: position --,
              category: resp[a].category,
              nombreDirigente: resp[a].nombreDirigente,
              nombreDocumento: resp[a].nombreDocumento,
              fechaDenuncia: resp[a].fechaDenuncia,
              lugar: resp[a].lugar,
              actividad: resp[a].actividad,
              numeroTrabajadoresAfectados: resp[a].numeroTrabajadoresAfectados ,
              lugarEmpresa: resp[a].lugarEmpresa,
              detalles:  resp[a].detalles,
              files:  resp[a].files ,
            } as Idocumentos )
          )
          this.dataSource = new MatTableDataSource(this.documentos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loadData = false;

          console.log(this.documentos);

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
    this.exporterService.exportToExcel(this.dataSource.data, 'documentos');
  }


  /* Funcion para llamar el dialogo de creación de tipos de documento */
  newCategory(){
    const dialogRef = this.dialog.open(CreateCategoryDocumentComponent);
  }
  listCategory(){
    const dialogRef = this.dialog.open(ListCategoryDocumentComponent, {
      maxWidth: '70vw',
      maxHeight: '70vh',
      height: '100%',
      width: '100%',
    });
  }
  newDocument(){
    const dialogRef = this.dialog.open(CreateDocumentComponent, {
      maxWidth: '45vw',
      maxHeight: '80vh',
      height: '100%',
      width: '100%',
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategorydocumentService} from '../../../services/categorydocument.service';
import { CreateCategoryDocumentComponent } from './create-category-document/create-category-document.component';
import { ListCategoryDocumentComponent } from './list-category-document/list-category-document.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor( private categorydocumentService: CategorydocumentService, public dialog: MatDialog) { }

  ngOnInit(): void {
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

}

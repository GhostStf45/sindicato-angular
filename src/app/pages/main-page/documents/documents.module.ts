import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//ruta
import { DocumentsRoutingModule } from './documents-routing.module';

//componente
import { DocumentsComponent } from './documents.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { CreateCategoryDocumentComponent } from './create-category-document/create-category-document.component';



/* Angular material */

import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ListCategoryDocumentComponent } from './list-category-document/list-category-document.component';

@NgModule({
  declarations: [DocumentsComponent, CreateDocumentComponent, CreateCategoryDocumentComponent, ListCategoryDocumentComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class DocumentsModule { }

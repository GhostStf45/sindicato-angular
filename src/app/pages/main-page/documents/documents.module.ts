import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

/*
  Firebase
*/
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule  } from '@angular/fire/storage';

//ruta
import { DocumentsRoutingModule } from './documents-routing.module';

//componente
import { DocumentsComponent } from './documents.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { CreateCategoryDocumentComponent } from './create-category-document/create-category-document.component';



/* Angular material */

/*
MatNativeDateModule, MatMomentDateModule,

*/

import { MatTableModule} from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ListCategoryDocumentComponent } from './list-category-document/list-category-document.component';
import { environment } from 'src/environments/environment';
import { DropzoneDirective } from './dropzone.directive';
import { UploadTaskComponent } from './upload-task/upload-task.component';

@NgModule({
  declarations: [DocumentsComponent, CreateDocumentComponent, CreateCategoryDocumentComponent, ListCategoryDocumentComponent, UploadTaskComponent, DropzoneDirective],
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
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFireStorageModule
  ]
})
export class DocumentsModule { }

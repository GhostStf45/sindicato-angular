import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { ArticulosRoutingModule } from './articulos-routing.module';

//componente
import { ArticulosComponent } from './articulos.component';

// Angular Material

import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ArticulosComponent],
  imports: [
    CommonModule,
    ArticulosRoutingModule,
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
export class ArticulosModule { }

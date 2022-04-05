import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

//ruta
import { AfiliadosRoutingModule } from './afiliados-routing.module';

//componente
import { AfiliadosComponent } from './afiliados.component';

/* Angular material */

import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditAfiliadoComponent } from './edit-afiliado/edit-afiliado.component';
import { ApproveAfiliadoComponent } from './approve-afiliado/approve-afiliado.component';

@NgModule({
  declarations: [AfiliadosComponent, EditAfiliadoComponent, ApproveAfiliadoComponent],
  imports: [
    CommonModule,
    AfiliadosRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AfiliadosModule { }

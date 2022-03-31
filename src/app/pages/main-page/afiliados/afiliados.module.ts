import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [AfiliadosComponent],
  imports: [
    CommonModule,
    AfiliadosRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AfiliadosModule { }

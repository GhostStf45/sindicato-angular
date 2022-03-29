import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { AfiliadosRoutingModule } from './afiliados-routing.module';

//componente
import { AfiliadosComponent } from './afiliados.component';

/* Angular material */

import { MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [AfiliadosComponent],
  imports: [
    CommonModule,
    AfiliadosRoutingModule,
    MatTableModule
  ]
})
export class AfiliadosModule { }

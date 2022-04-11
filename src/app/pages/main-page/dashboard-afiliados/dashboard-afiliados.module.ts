import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ruta
import { DashboardAfiliadosComponentRoutingModule } from './dashboard-afiliados-routing.module';

//componente
import { DashboardAfiliadosComponent } from './dashboard-afiliados.component';

@NgModule({
  declarations: [DashboardAfiliadosComponent],
  imports: [
    CommonModule,
    DashboardAfiliadosComponentRoutingModule
  ]
})
export class DashboardAfiliadosModule { }

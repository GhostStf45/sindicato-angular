import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
//ruta
import { DashboardAfiliadosComponentRoutingModule } from './dashboard-afiliados-routing.module';

//componente
import { DashboardAfiliadosComponent } from './dashboard-afiliados.component';



@NgModule({
  declarations: [DashboardAfiliadosComponent],
  imports: [
    CommonModule,
    DashboardAfiliadosComponentRoutingModule,
    GoogleChartsModule
  ]
})
export class DashboardAfiliadosModule { }

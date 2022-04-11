import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { DashboardAfiliadosComponent } from './dashboard-afiliados.component';


const routes: Routes = [
	{ path: '', component: DashboardAfiliadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAfiliadosComponentRoutingModule { }

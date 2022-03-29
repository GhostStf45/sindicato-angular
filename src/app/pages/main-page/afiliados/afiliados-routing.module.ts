import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { AfiliadosComponent } from './afiliados.component';


const routes: Routes = [
	{ path: '', component: AfiliadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliadosRoutingModule { }

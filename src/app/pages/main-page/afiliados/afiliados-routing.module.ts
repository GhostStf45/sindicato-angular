import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { AfiliadosComponent } from './afiliados.component';
import { EditAfiliadoComponent } from './edit-afiliado/edit-afiliado.component';

const routes: Routes = [
	{ path: '', component: AfiliadosComponent},
	{ path: 'edit-afiliado/:id', component: EditAfiliadoComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliadosRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home.component';



const routes: Routes = [
  {
    path: '',
	  component: HomeComponent,
	  loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GuestPagesRoutingModule { }

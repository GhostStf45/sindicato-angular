import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [
  {
    path: '',
	  component: HomeComponent,
	  loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule),
    canActivate: [AuthGuard]
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

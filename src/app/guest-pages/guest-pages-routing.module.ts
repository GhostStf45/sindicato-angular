import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: '',
	  component: HomeComponent,
	  loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('./public-routes.module').then(m => m.PublicRoutesModule),
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

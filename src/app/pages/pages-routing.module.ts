import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {AfiliadosGuard} from '../guards/afiliados.guard';

//componentes
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
	{
    path: 'panel',
	  component: MainPageComponent,
	  children: [
	  	{ path: '', loadChildren: () => import('./main-page/home/home.module').then(m=>m.HomeModule)},
	  	{ path: 'home', loadChildren: () => import('./main-page/home/home.module').then(m=>m.HomeModule)},
	  	{ path: 'documents', loadChildren: () => import('./main-page/documents/documents.module').then(m=>m.DocumentsModule)},
	  	{ path: 'afiliados', loadChildren: () => import('./main-page/afiliados/afiliados.module').then(m=>m.AfiliadosModule)},
	  	{ path: 'dashboard-afiliados', loadChildren: () => import('./main-page/dashboard-afiliados/dashboard-afiliados.module').then(m=>m.DashboardAfiliadosModule)},
	  	{ path: 'stores', loadChildren: () => import('./main-page/stores/stores.module').then(m=>m.StoresModule)},
	    { path: 'products', loadChildren: () => import('./main-page/products/products.module').then(m=>m.ProductsModule)},
	  	{ path: 'orders', loadChildren: () => import('./main-page/orders/orders.module').then(m=>m.OrdersModule)},
	  	{ path: 'sales', loadChildren: () => import('./main-page/sales/sales.module').then(m=>m.SalesModule)},
	  	{ path: 'messages', loadChildren: () => import('./main-page/messages/messages.module').then(m=>m.MessagesModule)},

	  ], canActivate: [AfiliadosGuard, AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';

//componentes
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './guest-pages/home/home.component';

const routes: Routes = [
   {path: '', redirectTo: '/home', pathMatch: 'full'},
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent},
	{ path: 'home', component: HomeComponent},
  { path: '**', component: Error404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

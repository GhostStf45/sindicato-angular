import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CommonModule } from '@angular/common';


import { AccountComponent } from './pages/account/account.component';
import { ContactComponent } from './pages/contact/contact.component';

const childRoutes: Routes = [
  { path: 'account', component: AccountComponent},
  { path: 'contact', component: ContactComponent}
]

@NgModule({
  declarations: [AccountComponent],
  imports: [
    RouterModule.forChild(childRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ChildRoutesModule { }

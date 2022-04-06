import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CommonModule } from '@angular/common';


import { InformationmainComponent } from './pages/informationmain/informationmain.component';
import { AccountComponent } from './pages/account/account.component';

const childRoutes: Routes = [
  { path: '', component: InformationmainComponent},
  { path: 'account', component: AccountComponent},
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

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CommonModule } from '@angular/common';


import { InformationmainComponent } from './pages/informationmain/informationmain.component';

const publicRoutes: Routes = [
  {
    path: 'main', component: InformationmainComponent

  },
]

@NgModule({
  declarations: [InformationmainComponent],
  imports: [
    RouterModule.forChild(publicRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class PublicRoutesModule { }

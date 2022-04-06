import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';


import { InformationmainComponent } from './pages/informationmain/informationmain.component';

const childRoutes: Routes = [
  { path: '', component: InformationmainComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ]
})
export class ChildRoutesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { GuestPagesRoutingModule } from './guest-pages-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule  } from '@angular/fire/storage';

import { SharedModule } from './pages/shared/shared.module';
import { HomeComponent } from './pages/home.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { InformationmainComponent } from './pages/informationmain/informationmain.component';

//Rutas
import { RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    GuestPagesRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ]
})
export class GuestPagesModule { }

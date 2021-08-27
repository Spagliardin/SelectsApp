import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CountrysRoutingModule } from './countrys-routing.module';
import { SelectsPageComponent } from './pages/selects-page/selects-page.component';


@NgModule({
  declarations: [
    SelectsPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CountrysRoutingModule
  ]
})
export class CountrysModule { }

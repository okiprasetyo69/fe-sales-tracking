import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolarAreaComponent } from './polar-area.component';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    ChartModuleSecond,
  ],
  declarations: [
    PolarAreaComponent,
  ],
  exports: [
    PolarAreaComponent,
  ],
})
export class polarAreaModule { }